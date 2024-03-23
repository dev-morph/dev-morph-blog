이번 포스트에서는 openssl을 이용하여 인증서 체인을 만드는 방법에 대해 정리해보고자 합니다.  
최종 모습은 **RootCA** - **IntermediateCA** - **Leaf** 구조 (2depth)가 될 것입니다.  
그리고 이렇게 발급된 인증서가 정상적으로 발급된 것인지 openssl을 활용한 검증 방법까지 정리해보도록 하겠습니다.

#

# Prerequisite

당연히 아래 일련의 작업을 진행하기 위해서 openssl이 설치되어 있어야 합니다.  
인증서, 개인키, 공개키에 관련된 지식이 있으면 좋습니다.(최대한 자세히 설명할 것이기에 없어도 무방합니다:))

#

---

# 일반적 인증서 발급 순서

openssl을 이용하여 인증서를 발급받는 일반적인 순서는 아래와 같을 것입니다.
하지만 RootCA, IntermediateCA, Leaf 마다 발급 시 옵션이 조금씩 상이하니 아래 글을 따라 진행해주시면 되겠습니다.
(CA = Certificate Authority)

1. privateKey 생성
2. CSR 생성
3. Certificate생성

#

---

# RootCA 인증서 발급

RootCA인증서 발급방법에 대해 바로 들어가기 전에 먼저 **CSR이 무엇인지** 간단히 집고 넘어가도록 하겠습니다.  
만약, 이미 **RootCA는 CSR을 생성할 필요가 없는 이유**에 대해 알고 계시다면 아래 CSR부분은 넘겨도 무방합니다.

#

---

## 1. CSR(Certificate Signing Request)?

CSR은 인증서 발급기관(Certificate Authority)에게 제출하는 일종의 **인증서 발급 신청서**라고 할 수 있습니다.  
CSR이 일반적으로 어떤 내용을 포함하고 있는지 openssl을 이용해 확인해 보겠습니다.  
(아래 커맨드에 대해서는 자세히 후술 할 예정이니 CSR내용에 대해 집중해 봐주시면 되겠습니다.)

#

```bash
# CSR 출력 커맨드
openssl req -in serverCA.csr -text -noout

# CSR 내용
Certificate Request:
    Data:
        Version: 1 (0x0)
        Subject: C=KR, ST=Seoul, L=Yeouido, O=ServerCA, OU=ServerCA, CN=localhost
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)
                Modulus:
                    00:fc:80:2b:1c:af:...
                Exponent: 65537 (0x10001)
        Attributes:
            (none)
            Requested Extensions:
    Signature Algorithm: sha256WithRSAEncryption
    Signature Value:
        7e:bc:c7:79:09:...
```

#

**Subject**는 인증서에 포함될 Entity에 대한 정보를 가지고 있으며 각각의 항목은 다음을 의미합니다.

#

1. **C**(country): 국가
2. **ST**(State or Province Name): 주, 또는 지방
3. **L**(Locality Name): 도시 또는 지역
4. **O**(Organization Name): 주체의 조직 또는 회사명
5. **OU**(Organization Unit Name): 주체의 부서나 단위
6. **CN**(Common Name): 주로 서버의 도메인 이름이나 개체의 이름입니다. 인증서가 특정 도메인이나 개체와 연결되어야 할 때 사용

#

**Subject Public Key Info**는 인증서에 포함된 **PublicKey**에 대한 정보를 보여줍니다. 각각의 항목은 다음을 의미합니다.

#

1. Public Key Algorithm: 공개키 생성 알고리즘
2. Public-Key: 공개키 크기(e.g. 2048 bit)
3. Modulus, Exponent: RSA알고리즘 디테일정보
4. Signature Value: CSR에 포함된 publicKey와 쌍이 되는 privateKey를 이용해 CSR에 사인한 값. (CA가 검증하기 위해 사용)

#

이렇게 CSR은 CA에게 이런이런 내용의 인증서를 발급해달라는 신청서입니다.  
따라서 상위 CA가 없는 **RootCA는 CSR을 생성할 필요가 없습니다.** (RootCA는 Self-Signed한 인증서를 가지게 됩니다.)

#

---

#

## 2. RootCA 인증서 발급

아래 명령어를 통해 RootCA의 개인키와 인증서를 발급받을 수 있습니다.

#

```bash
#serverRootCA 개인키 생성
openssl genrsa -aes256 -out rootCA.key 2048
#serverRootCA 인증서 발급(self-sign)
openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1825 -out rootCA.pem
```

#

위 command 및 option들이 가지는 의미는 아래와 같습니다.

1. genrsa: rsa알고리즘을 이용하여 개인키 생성
2. -aes256: 개인키 생성시 AES 256 비트 암호화 사용
3. -out: 출력 파일의 이름 지정
4. 2048: 개인키 길이
5. req -x509 -new: x.509형식의 새로운 인증서를 생성
6. -key: 인증서에 서명할 키를 지정(이때 RootCA의 개인키를 그대로 사용 -> selfSigned)
7. -sha256: 인증서 서명을 sha256알고리즘 이용해 암호화
8. -days: 인증서 유효기간
9. -out: 출력파일 이름지정

#

---

#

## 3. 발급 시 입력 값 예시 및 결과

위 커맨드를 그대로 붙여넣게 되면 몇가지 입력할 사항들이 생기는데, 이 부분은 아래처럼 입력해주면 됩니다.  
아래 내용은 블로그 포스트용으로 임시로 생성한 것으로, 적합하게 바꿔 입력하면 됩니다.

#

![RootCA 인증서 발급 입력항목](rootca_input.png)

#

위 절차를 정상적으로 마쳤다면, **rootCA.key와 rootCA.pem**파일이 생성된 것을 볼 수 있습니다.

#

---

#

# IntermediateCA 인증서 발급

이제 위에서 만든 **RootCA인증서로 사인한 IntermediateCA용 인증서**를 발급 받아보도록 하겠습니다.

#

---

#

## 1. IntermediateCA 인증서 발급

RootCA인증서 발급과 흡사하지만 주의할 부분은 아래와 같습니다.

1. 발급절차에 **CSR 생성** 추가
2. 인증서 발급시 **CA관련 정보 입력** 및 **basicConstraints 추가**

아래 커맨드를 이용해 **IntermediateCA의 개인키, CSR 그리고 인증서**를 발급할 수 있습니다.

#

```bash
# intermediateCA 개인키 생성
openssl genrsa -aes256 -out intermediateCA.key 2048
# intermediateCA CSR 생성
openssl req -new -sha256 -key intermediateCA.key -out intermediateCA.csr
# intermediateCA 인증서 발급
openssl x509 \
  -req \
  -in intermediateCA.csr \
  -CA rootCA.pem \
  -CAkey rootCA.key \
  -CAcreateserial \
  -out intermediateCA.pem \
  -days 365 \
  -sha256 \
  -extfile <(echo "basicConstraints=critical,CA:TRUE")
```

#

위 커맨드에서 주의할 부분은 아래와 같습니다.

1. **-CAcreateserial**: 자동으로 시리얼(serial) 파일을 생성, 서명된 인증서에 serial number를 할당.  
   (이 옵션이 있으면, 따로 serial number를 지정할 필요가 없어서 편리)
2. **-extfile**: 사용자 지정 확장(extension) 구성 파일을 지정하는 데 사용. 주로 인증서의 확장 필드를 설정하는 데 활용.
   여기에서는 Leaf인증서가 아닌, **CA인증서로 발급**하기 위해 사용(자세한 내용은 하단 TroubleShooting 참고)

#

---

#

## 2. 발급 시 입력 값 예시 및 결과

EmailAddress와 optional한 입력값들은 그냥 enter키를 입력하여 넘겼습니다.

#

![IntermediateCA 인증서 발급 입력항목](intermediateca_input.png)

#

이제 intermediateCA.key, intermediateCA.csr, intermediateCA.pem이 생성된 것을 볼 수 있을 것입니다.  
아래 명령어를 통해 인증서가 제대로 생성됐는지 살펴보고 가겠습니다.

```bash
# intermediateCA 인증서 출력
openssl x509 -in intermediateCA.pem -text -noout
```

#

출력 결과는 아래와 같습니다.

![IntermediateCA 인증서 상세](intermediateca_cert_detail.png)

#

여기에서 주의해서 볼 점은 **Issuer** 부분과 **X509v3 extensions** 부분입니다.  
Issuer 부분에서 RootCA 인증서를 발급할 때 입력한 값들이 제대로 들어 있는지 확인합니다.

#

X509v3 extensions 부분에서 **X509v3 Basic Constraints가 critical, CA:TRUE**로 세팅되어 있는지 확인합니다.  
이 값이 존재해야 **Leaf인증서가 아닌, CA인증서로 제대로 발급된 것**입니다.

#

---

#

## 3. 검증

intermediateCA 인증서가 제대로 발급되었는지, 간단히 검증해보도록 하겠습니다.  
아래 명령어로 검증 해볼 수 있습니다.

#

```bash
# openssl 인증서 검증
openssl verify -CAfile rootCA.pem intermediateCA.pem
```

#

아래처럼 OK가 나오면 rootCA로 제대로 사인되었고, 검증이 가능하다는 뜻입니다.

![IntermediateCA 인증서 검증 결과](intermediateca_verify.png)

#

---

#

# Leaf 인증서 발급

이제 intermediate인증서를 이용하여 Leaf 인증서를 발급해보도록 하겠습니다.  
Leaf 인증서는 **해당 인증서로 다른 인증서를 발급하지 못하는 인증서**를 말합니다. 즉, **CA 인증서가 아니라는 뜻**입니다.

#

---

#

## 1. Leaf 인증서 발급

intermediateCA 인증서를 발급했던 것과 거의 흡사합니다. 단, CA인증서 확장필드값을 설정해주는 부분이 사라졌습니다.

#

```bash
openssl genrsa -aes256 -out leaf.key 2048
openssl req -new -sha256 -key leaf.key -out leaf.csr
openssl x509 \
	-req \
	-in leaf.csr \
	-CA intermediateCA.pem \
	-CAkey intermediateCA.key \
	-CAcreateserial \
	-out leaf.pem \
	-days 365 \
	-sha256
```

#

---

## 2. 발급 시 입력 값 예시 및 결과

intermediateCA 인증서를 발급과 같은 절차입니다.

#

![Leaf 인증서 발급 입력항목](leaf_input.png)

#

이제 leaf.key, leaf.csr, leaf.pem 파일이 생성된 것을 볼 수 있을 것입니다.

#

아래처럼 정상적으로 발급된 것을 확인 할 수 있습니다.  
extensions에 CA관련 부분이 없다는 것을 확인 할 수 있습니다.

```bash
openssl x509 -in leaf.pem -noout -text
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            15:01:be:40:d1:b4:5f:72:6d:b1:d2:df:2b:18:1f:d7:14:d6:a5:2e
        Signature Algorithm: sha256WithRSAEncryption
        Issuer: C=KR, ST=Seoul, L=Yeouido, O=IntermediateCA, OU=IntermediateCA, CN=localhost
        Validity
            Not Before: Mar 20 01:32:41 2024 GMT
            Not After : Mar 20 01:32:41 2025 GMT
        Subject: C=KR, ST=Seoul, L=Yeouido, O=Leaf, OU=Leaf, CN=localhost
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)
                Modulus:
                    00:c6:26:c9:b3:...
                Exponent: 65537 (0x10001)
        X509v3 extensions:
            X509v3 Subject Key Identifier:
                47:9C:51:5B:9E:12:C8:C8:1C:A6:BB:FE:28:63:18:0A:C3:89:9C:D7
            X509v3 Authority Key Identifier:
                85:29:C1:4C:3D:2A:87:CC:A4:88:DA:FD:89:8B:BE:71:BE:BD:9D:83
    Signature Algorithm: sha256WithRSAEncryption
    Signature Value:
        58:7c:1e:57:c1:3d:...
```

#

---

#

## 3. 검증

이제 RootCA, IntermediateCA 인증서를 이용해 Leaf 인증서가 제대로 발급되었는지 확인해보겠습니다.  
먼저 RootCA 인증서와 IntermediateCA 인증서를 이어붙여 **trustChain**을 만들겠습니다.

#

```bash
# trustChain 생성
cat rootCA.pem intermediateCA.pem > trustChain.pem
```

#

**openssl은 검증할 때, 인증서 체인을 따라 올라가며 RootCA인증서까지 검증**을 합니다.  
따라서 위처럼 trustChain을 만들어 검증하는 것이 편리합니다.  
이 trustChain으로 **RootCA부터 Leaf 인증서까지 모두 정상적으로 검증**되는 것을 아래 사진을 통해 볼 수 있습니다.

#

![TrustChain 인증서 검증](trustchain_verify.png)

#

---

#

# TroubleShootings

## 1. unable to get issuer certificate

openssl이 검증할 때 최상단 RootCA 인증서까지 검증한다는 사실을 모르고,  
**IntermediateCA 인증서로 Leaf인증서를 검증**하려고 하여 아래와 같은 에러를 계속 맞이하였습니다.

#

```bash
openssl verify -CAfile wrongCA.pem leaf2.pem
C=KR, ST=Seoul, L=Yeouido, O=WrongCA, OU=WrongCA, CN=localhost
error 2 at 1 depth lookup: unable to get issuer certificate
error leaf2.pem: verification failed
```

#

이 부분은 앞서 설명한 것처럼 RootCA 인증서까지 포함한 trustChain을 만듦으로써 해결할 수 있었습니다.

#

---

#

## 2. invalid CA certificate

trustChain을 구성했음에도 검증에 실패하며 아래와 같은 에러가 발생하였습니다.

```bash
openssl verify -CAfile wrongTrustChain.pem leaf2.pem
C=KR, ST=Seoul, L=Yeouido, O=WrongCA, OU=WrongCA, CN=localhost
error 79 at 1 depth lookup: invalid CA certificate
error leaf2.pem: verification failed
```

이는 IntermediateCA 인증서 발급시, CA인증서가 아닌 Leaf인증서를 발급받아 생긴 문제였습니다.  
즉, **IntermediateCA 인증서가 invalid CA certificate 라는 뜻**입니다.

#

스택오버플로우에서 openssl에서 확장필드값을 설정하지 않고 인증서를 발급하게 되면,  
**default로 CA인증서가 아니라 Leaf인증서를 발급**한다는 사실을 알게 되었습니다. [(참고링크)](https://stackoverflow.com/questions/67883761/openssl-verify-fails-if-done-with-multiple-issuer-certificates)

#

이는 앞서 IntermediateCA 인증서를 발급하는 부분에서 언급한 것처럼 **CA 인증서로 지정하는 extension 부분을 설정**하여 해결할 수 있었습니다.
