최근 진행 중인 프로젝트에서 서명, 검증 기능을 개발하는 부분을 담당하고 있습니다.
이번 포스트에서는 제가 어떤 문제를 맞이했고 어떻게 문제를 해결 할 수 있었는지 정리해보고자 합니다.

#

---

# 문제 상황

문제상황은 아래와 같습니다.

검증하기 위해서는 byte[]로 되어 있는 구조체 전체에서 사내에서 정한 **Delimiter**(구분자)를 찾아야 했습니다.

여기에서 제가 맞이한 문제는 아래와 같았습니다.

#

1. 구조체의 크기가 매우 크다.(최대 2GB)
2. 기존의 Delimiter를 찾는 방식은 O(M\*N)의 시간복잡도를 가진다.

#

## 기존 탐색알고리즘

기존의 Delimiter를 찾는 방식은 단순히 이중 for문을 이용한 방식으로 아래와 같았습니다.

```java
public static Integer getPatternIndex(byte[] parent, byte[] pattern){
    int parentSize = parent.length;
    int patternSize = pattern.length;


    //i is parent index
    for(int i = 0; i <= parentSize - patternSize; i++){
        Boolean found = Boolean.TRUE;
        //j is pattern index
        for(int j = 0; j < patternSize; j++){
            if(parent[i + j] != pattern[j]){
                found = Boolean.FALSE;
                break;
            }
        }

        if(found.equals(Boolean.TRUE)) return i;
    }
    //pattern 찾기 실패 시 -1 리턴
    return -1;
}
```

해당 방식은 이중 for문을 이용하여 O((N-M + 1) \*M)시간 복잡도를 가진다는 것을 알 수 있습니다.  
(M: parent 길이, N: pattern의 길이)

#

---

# 해결방법

우선, 위의 비효율적인 알고리즘을 봤을 때, 가장 먼저 든 해결방법은 예전에 알고리즘을 문제를 풀다 만나봤던 KMP알고리즘을 사용하는 방법 이었습니다.

바로 적용하기 이전에 KMP이외의 더 적합한 탐색알고리즘이 있는지 찾아봤습니다.  
그 결과 보통 탐색알고리즘으로 **KMP알고리즘**과 **Rabin-Karp알고리즘**을 많이 쓴다는 것을 확인 할 수 있었습니다.

#

이 중 저는 **KMP알고리즘을 사용하기로 결정** 했습니다.  
그 이유는 아래와 같습니다.

1. Delimiter는 4byte의 매우 작은 크기를 가진다 → KMP 테이블 생성에 있어 시간, 공간적 부담이 없다.
2. java byte의 overflow걱정을 할 필요 없다.  
   (Rabin-Karp를 이용할 경우, hash 할 때, byte overflow문제를 고려해줘야 한다.)
3. 두 알고리즘의 worst-case 시간복잡도는 O(m+n)정도로 비슷하다.  
   (이는 매우 특수한 값인 Delimiter를 사용했기에, Rabin-Karp의 superious hits는 없다고 가정할 경우이다.)

#

---

#

## 1. KMP 알고리즘 구현

그럼 KMP 알고리즘을 구현해보도록 하겠습니다.

### 1-1. KMP 테이블 생성

아래의 내용은 [KMP알고리즘 정리영상](https://www.youtube.com/watch?v=V5-7GzOfADQ)을 보고 정리한 내용입니다.  
**KMP알고리즘**은 prefix(접두사)와 suffix(접미사)를 활용하여 naive 알고리즘을 개선한 알고리즘입니다.

#

간단히 prefix, suffix를 정의하고 넘어가겠습니다.  
여기서 **접두사**는 a, ab, abc, abcd, abcda, abcdab, abcdabc가 됩니다.  
그리고 **접미사**는 c, bc, abc, dabc, cdabc, bcdabc, abcdabc가 될 것입니다.   
어렵지 않은 개념이니 금방 이해할 수 있을 것이라 생각합니다.

#

KMP알고리즘은 **prefix와 suffix가 일치하는 가장 긴 길이**인 **LPS**(Longest Prefix, suffix)를 이용합니다.  
아래표는 LPS테이블이 어떻게 구성되는지 보여줍니다.

#

![KMP Table](kmp_table.png)

#

이 테이블을 생성하는 함수는 아래처럼 만들 수 있을 것입니다.

```java
public static byte[] getKMPTable(byte[] pattern){
    int patternSize = pattern.length;
    byte[] resultTable = new byte[patternSize];

    int j = 0;
    for(int i = 1; i < patternSize ; i ++){
        if(pattern[i] != pattern[j]){
            j = 0;
        }
        if(pattern[i] == pattern[j]){
            resultTable[i] = (byte)(j + 1);
            j++;
        }
    }

    return resultTable;
}
```

#

### 1-2. KMP 알고리즘 구현

바로 아래 예시를 통해 KMP알고리즘이 어떻게 naive 알고리즘을 개선했는지 알아보도록 하겠습니다.

![naive algorithm](naive_algo.png)

#

위 사진을 보면 5번째 Index에서 Text (A)와 Pattern (D)가 일치하지 않았습니다.

이 상황에서 naive 알고리즘을 사용한다면, Text의 Index 1부터, Pattern은 0부터 다시 일치하는지 하나씩 맞춰 볼 것입니다.

KMP알고리즘은 이 상황에서 Text **4번째 인덱스 까지는 다시 볼 필요가 없다는 점**을 이용하여 시간복잡도를 개선합니다.

#

어떻게 4번째 인덱스까지는 볼 필요가 없다는 사실을 알 수 있을까요?

#

아래 표를 한번 살펴보겠습니다.

![KMP algorithm - process1](kmp1.png)

#

KMP 알고리즘은 Text[i]와 Pattern[j]가 일치 하지 않았을 때, j를 Table[j-1]으로 옮겨줍니다.

#

위 사진에서 i, j는 5이므로, j만 Table[5-1]의 값, 즉 0으로 옮겨주는 것입니다.

이 상황에서(i = 5, j = 0) 다시 Text와 Pattern의 비교를 시작합니다.

어떤가요? 이렇게 KMP Table을 이용해서 다시 Text Index(i) 1부터 탐색하지 않고, 우리의 탐색을 이어갈 수 있습니다.

#

![KMP algorithm - process2](kmp2.png)

#

그리고 이렇게 Pattern의 길이만큼 일치하는 Text를 찾았을 때, **i - patternSize + 1**을 리턴하면 Pattern의 위치를 찾을 수 있습니다.

여기에서는 5가 되겠죠.

#

이 로직은 아래 코드로 구현할 수 있습니다.

```java
public static Integer findPatternByKmp(byte[] parent, byte[] pattern){
    int parentSize = parent.length;
    int patternSize = pattern.length;
    byte[] kmpTable = getKMPTable(pattern);

    int j = 0;
    for(int i = 0; i < parentSize; i++){
        while(j > 0 && parent[i] != pattern[j]){
            j = kmpTable[j - 1];
        }

        if(parent[i] == pattern[j]){
            if(j == patternSize - 1){
                return i - patternSize + 1;
            }
            j++;
        }
    }
    return null;
}

```

#

---

#

## 2. 구조체 구조에 맞도록 KMP 알고리즘 최적화

지금까지 일반적인 KMP알고리즘을 어떻게 구현할 수 있는지 알아봤습니다.

이제 이 알고리즘을 어떻게 **로직에 맞도록 최적화** 시켰는지 알아보도록 하겠습니다.

#

단, 일반적인 알고리즘이 아닌 사내 최적화 코드는 공개가 어려운점 양해 부탁드립니다.

#

우선, Delimiter가 포함되어 있는 구조체는 대략 아래와 같은 구조를 가지고 있습니다.(사실 훨씬 복잡한 구조를 가지고 있지만...)
여기서 앞 부분에 위치한 파일데이터가 매우 큰 사이즈를 가지고 있습니다.

![data_structure](data_structure.png)

#

KMP알고리즘을 그대로 사용한다면 매우 큰 사이즈의 파일데이터부터 탐색을 할 것입니다.  
하지만 우리가 찾는 데이터는 항상 기타데이터 부분에 위치하고 있습니다.

#

즉, 스킵해도 될 파일데이터를 탐색하며 시간을 낭비하는 것 입니다.

#

이를 해결하기 위해 뒤에서부터 KMP 알고리즘 탐색을 하도록 하는 함수를 따로 구현하였습니다.

#

그리고 아래처럼 로직을 구성하였습니다.

1. 전체 파일 사이즈를 기준으로 하여 일정 사이즈 이하 ➡ 기존 KMP알고리즘을 그대로 사용,
2. 기준 사이즈를 초과 ➡ 뒤에서부터 탐색하는 알고리즘 사용

#

이와 같은 방식으로 평균적으로 약 50%이상 탐색 성능을 개선할 수 있었습니다.

#

---

#

# 느낀점

항상 알고리즘 공부를 하면서 이런 알고리즘을 실제로 내가 쓸 일이 있을까? 라는 생각이 들때가 많았는데,  
예전에 공부했던 알고리즘을 실제 비지니스 로직에 녹여 성능을 유의미하게 개선하는 경험은 정말 재밌었습니다.

#

결론 참 재밌었다!🤩
