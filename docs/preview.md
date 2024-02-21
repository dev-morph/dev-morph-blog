---
title: 'About me'
date: '2024-01-20'
excerpt: I am a frontend developer who loves to work out.
isFeatured: true
---

성능향상을 위해 도입한 Springboot Webflux, R2DBC.하지만 대량의 데이터를 INSERT할 때 성능이 훨씬 떨어졌습니다. 어떻게 성능을 개선할 수 있었는지 정리해보고자 합니다.

## **Bulk Insert란 ?**

Bulk Insert는 여러개의 Insert 쿼리를 한번에 묶어서 처리하는 것을 의미합니다.

#

예를 들어, 3건의 INSERT 쿼리를 날린다고 했을 때 아래처럼 3개의 INSERT문을 날리는 것이 아니라,

```sql
INSERT INTO TestTable(c1, c2) VALUES(v1, v2);
INSERT INTO TestTable(c1, c2) VALUES(v3, v4);
```

아래처럼 하나의 쿼리로 처리하는 것을 **Batch Insert** 라고 합니다.

```sql
INSERT INTO TestTable(c1, c2)
VALUES(v1, v2), (v3, v4);
```

지금까지 당연히 다량의 데이터를 처리할 때엔 Bulk Insert를 사용하고 있었습니다.

#

---

## **R2DBC Bulk Insert 성능**

Reactive한 R2DBC를 선택 했을 때 당연히 성능이 개선되길 기대했습니다. 하지만, R2DBC를 이용하여 Bulk Insert를 했을 때 오히려 성능이 저하되는 것을 확인하였습니다.

제가 짰던 코드 방식을 보며 어떤 문제가 있었고, 어떻게 성능을 개선 했는지 알아봅시다.

### **개발 기능 명세**

제가 개발한 기능은 아래와 같습니다.

-   초당 1000건의 데이터를 수신하여 Buffer에 저장
-   Buffer가 정해진 수량에 도달하거나 OR 정해진 시간이 지나면, Buffer에 있는 데이터를 MariaDB에 Insert (**Bulk Insert**)

#

---

#

### **1\. SaveAll 방식 - 10,000건: 17초**

가장 처음에는 R2DBC repository에서 제공하는 saveAll() 메소드를 이용하였습니다.
예상과 달리, Bulk Insert가 아닌 개별 Insert쿼리가 생성되는 것을 볼 수 있었습니다.

```java
private Flux<TestEntity> batchInsert(Flux<TestEntity> testFlux) {
    long startTime = System.currentTimeMillis();
    return testRepository.saveAll(testFlux)
                	 .doOnComplete(() -> {
                         	 long endTime = System.currentTimeMillis();
	                         long elapsedTime = endTime - startTime;
                         	log.info("Time consumed by bulkInsertCarStatus: {} milliseconds", elapsedTime);
                         });
}
```

Bulk Insert가 아니기에 성능은 매우 안좋았습니다.
10000건의 데이터를 Insert하는데 총 17초가 걸렸습니다.

#

![insert-performance](insert-performance.png)

#

---

#

### **2\. Parameterized Statement 방식 - 10,000건: 10.5초**

r2dbc 에서 batch insert를 할 때에는 statement의 add(), bind()를 이용해야 한다는 부분을 찾았습니다.**([r2dbc 공식문서 - statements.batching](https://r2dbc.io/spec/0.8.5.RELEASE/spec/html/#statements.batching))**

#

공식문서대로 금방 개발 할 수 있었습니다. 대략적인 코드는 아래와 같았습니다.

```java
private Flux<TestDTO> flushDatas(List<TestDTO> testDtoList) {

    return databaseClient.inConnectionMany(connection -> {
        Statement stmt = connection.createStatement(this.initSql.toString());
        this.bindAllListValues(stmt, testDtoList, TestDTO.class);
        long startTime = System.currentTimeMillis();
        return Flux.from(stmt.execute())
                .flatMap(result -> (Flux<TestDTO>) result.map((row, metadata) -> {
                    return TestDTO.builder()
                            .id(null)
                            .build();
                }))
                .doOnComplete(() -> {
                    long endTime = System.currentTimeMillis(); // Capture end time
                    long elapsedTime = endTime - startTime; // Calculate elapsed time
                    log.info("Time consumed by bulkInsertCarStatus: {} milliseconds to insert {} items.",
                            elapsedTime, carStatusList.size());
                });
    });
```

날라가는 쿼리를 체크했을 때, 개별적인 Inert 쿼리가 아닌 Bulk Inert로 작동함을 확인했습니다.

성능 또한 이전의 saveAll 방식에 비해 많이 개선되었지만, 여전히 너무 느렸습니다. 테스트 결과는 아래와 같았습니다.  
buffer사이즈는 한번의 쿼리에 몇 건의 데이터를 Insert 하는 지를 의미합니다.

예를 들어, 버퍼 사이즈가 1,000건 인데 총 10,000건을 Insert한다면 10개의 쿼리가 생성 될 것입니다.

아래 테스트 결과는 총 10,000건의 데이터를 각기 다른 버퍼 사이즈로 Insert 했을 때 소요된 시간에 대한 표입니다.

#

![bulk-insert-performance](bulk-insert-performance.png)

---

#

buffer 사이즈에 따라 성능이 달라지는 것을 확인했습니다, 몇 번의 테스트를 통해 10,000건을 Insert하기 위해서는 buffer 사이즈를 2000개로 정하는 것이 좋다고 판단 했습니다, 하지만 여전히 불만족스러운 성능을 보여주고 있었습니다.

---

### **3\. Index 조정 **\- 10,000건: 10.3초\*\*\*\*

사내에서 batch insert 테스트 중인 테이블은 꽤나 많은 칼럼과 하나 이상의 index를 가지고 있었습니다.

설계 단계에서 빠른 검색을 위해서 index를 설정 했었습니다. 이 부분이 Insert 할 때 문제가 될 수 있다고 하여 정말 최소한의 인덱스만을 남기고 삭제했습니다.

하지만 유의미하게 성능이 개선 되지 않았고, 심지어 모든 인덱스를 제거하고도 성능은 10초 이하로 내려가지 않았습니다.

#

---

#

### **4\. Raw Query 방식 - 100,000건 : 10.05초** 

납득할 수 없는 성능에 열심히 구글링을 한 결과 r2dbc 깃헙 이슈에서 다음과 같은 글을 찾을 수 있었습니다. ([**r2dbc batch issue**](https://github.com/spring-projects/spring-data-r2dbc/issues/259))

이슈 등록은 2019년 12월 19일 이었지만, 최근까지 업데이트가 되고 있는 따끈따끈한 이슈였습니다.
해당 이슈의 요약은 아래와 같았습니다.(직접 읽어 보는 것을 추천합니다.)

#

데이터베이스에서 Batch Insert를 하는 방법은 크게 두가지가 있다.

1\. parameterize하지 않고, SQL operations을 이어 붙이는 방식

2\. bind를 통한 prepared statements를 사용하는 방식

(위에 사용한 parameterized statement 방식이 2번에 해당하는 방식이었습니다. )

#

그리고 SpringData의 **[mp911de](https://github.com/mp911de)** 는 **Statement.add().add() 를 이용해도 결국 왜 batch를 이용하지 못하는 이유**를 묻는 질문에 대해 아래와 같이 답변 했습니다.

#

몇몇 DB의 드라이버들은 이전에 실행된 statement와 타입이 매칭 된다면, prepared statement 캐쉬를 이용하지만, **Postgres, SQL Server, H2, MariaDB**의 경우에는 parametrized statement with a table of bindings을 이용 할 수 있는 API가 제공되지 않는다고 합니다.

#

결국, **위에서 언급한 데이터베이스들을 이용 중이라고 한다면, 앞서 언급한 1번 방식, SQL을 직접 이어 붙이는 방식을 이용** 해야 좋은 성능을 낼 수 있다는 것입니다.

#

어떻게 구현했는지 알아보기 전에, 개선 후 성능을 확인해보겠습니다.

#

아래 결과는 **버퍼 사이즈를 20,000건**으로 **총 100,000건을 INSERT** 했을 때 걸린 테스트 결과입니다. (10,000건 Insert시 1초미만의 결과가 나왔습니다.)

#

**총 9,552ms**이 걸린 것을 확인 할 수 있고, 처음 10,000건에 17초가 걸렸던 것을 기억한다면 **약 17.8배 성능 향상**이 있었음을 알 수 있습니다. (참고로 아래 정보는 Reactive로 실행되기에 가장 오래 걸린 건만 보면 됩니다.)

![after-bulk-insert-performance](after-bulk-insert-performance.png)

---

### **\[Solved\] 직접 쿼리 생성 함수 만들기**

이제 원인은 알았고, 우리가 원하는 쿼리를 이어 붙이는 함수를 만들어줘야 합니다.

#### **1) initSql 생성 함수**

아래처럼 내가 원하는 Entity를 넘겨주면 해당 클래스가 가지고 있는 필드네임을 읽어서, 쿼리의 첫 시작 부분을 만들어 주는 함수를 만들었습니다.

```java
public <T> StringBuilder getInitSql(Class<T> clazz)
```

이때 이 함수의 리턴 값은 아래와 같을 것입니다.  
"**INSERT INTO test_table(c1, c2, c3, c4) VALUES**"

#

#### **2) value concat 함수**

이제, 저 initSql 뒤에 실제 값들을 이어 붙여서 쿼리를 만들어 봅시다.

```java
public <T> StringBuilder generateBatchQuery(List<T> targetDatas, Class<T> clazz)
```

한번에 처리해도 되지만 targetDatas를 순환하면서 아래와 같은 generateQuery() 함수를 실행시켜 주는 방식으로 구현했습니다.

tableName은 사실 필요 없지만, 사내 규칙이 uuid + tableName을 이용하여 PK를 만드는 것이라 어쩔 수 없이 추가했습니다.

```java
public <T> StringBuilder generateSingleQuery(String tableName, T data, Class<T> clazz)
```

generateBatchQuery 함수의 리턴 값은 아래와 같을 것입니다.

"**(v1, v2, v3, v4), (v5, v6, v7, v8);**"

#

#

---

### **주의할 점**

사실 위 함수들을 만드는 로직자체는 크게 어렵지 않지만, 아래와 같은 **주의 할 점**들이 있습니다.

#

**1\. TypeCheck** - SQL을 만들 때, primitive type(double, number, bigDecimal, boolean, etc)와 같은 타입들은 single quote를 붙이면 안되고, 나머지 타입에는 붙여줘야 합니다.

#

**2\. SQL Injection** \- 이런 방식으로 쿼리를 DB에 보내게 되면 SQL Inject에 취약할 수 있습니다. 저는 이를 예방하기 위해서 최소한의 조치인 **HtmlUtils.htmlEscape(String input)** 를 이용했습니다.

#

위와 같은 방식으로 쿼리를 직접생성하는 Util 함수를 만들어 성능개선을 이룰 수 있었습니다.

혹시 좀 더 제가 개선 할 수 있는 사항이 있거나, 궁금하신 점, 수정해야 할 내용이 있다면 댓글로 알려주시면 감사하겠습니다! 🙏
