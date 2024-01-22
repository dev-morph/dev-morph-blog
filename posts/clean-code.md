---
slug: 'clean-code'
title: '리액트 코드 클린하게 작성하기(feat. React 실제 코드)'
date: '2024-01-22'
image: clean-code.png
excerpt: 개발 2년차가 바라본 클린하게 코드 짜는 방법.
isFeatured: true
---

사실 처음 취직했을 때에 클린 코드에 대해 들었을 때에는 **"당연히 그렇게 짜면 좋겠지. 근데, 어떤 게 클린 코드지? 공식문서보면서 내가 알아보기 쉽게 코딩하고 있으면 클린한 코드가 아닌가?"** 라는 생각을 했습니다. 필독서라는 **로버트마틴의 CleanCode**라는 책도 읽어 보고 몇 가지는 실제 프로젝트에 반영해 보기도 했지만 크게 와닿지는 않았습니다.

#

어느새 제가 개발자란 직업을 가지게 된 지 만 2년이 넘어 3년 차가 된 기념으로, 현재 제가 생각하는 클린 코드는 무엇인지, 실제 제가 어떤 식으로 코드를 작성하고 있는지 최근 작성한 리액트 코드와 함께 정리해 보고자 합니다.

# **클린 코드?**

직접 경험하고 책과 영상들을 보며, 나름대로 내린 **클린코드의 정의**는 아래와 같습니다.

-   **원하는 부분을 빨리 찾을 수 있어야 합니다. ➡ 즉, 가독성이 좋아야 하며 유지보수가 용이해야 합니다.**
-   **불필요한 부분은 감추고 핵심로직만 노출 되어야 합니다.**

결국 가독성 좋게(네이밍 규칙 잘 지키고) 코드를 짜고, 핵심 로직은 노출, 불필요한 부분은 숨기기만 해도 클린한 코드에 가까워 지지 않을까? 라는 생각을 했습니다.

#

너무 당연한 얘기인 것 같고, "그래서 뭐 어떻게 하라고?" 라는 생각이 들 수 있지만 아래에서 그래서 어떻게 해야 하는지 **실제 코드를 보면서 알아봅시다.**

---

# **사례 1(포스트 카드 리팩토링)**

## **\[수정 전 코드\]**

아래 코드는 사진처럼 제 블로그의 **포스트 카드**를 담당하는 리액트의 JSX 코드입니다.  
hover 됐을 때 약간의 어두운 레이아웃을 주면서 요약된 글을 보여주는 기능이 있고, 클릭하게 되면 해당 포스트 상세 페이지로 이동합니다.

#

![Post-Card Image](post-card.png)

```js
<article className={classes.post}>
	<Link href={linkPath}>
		<div className={classes.image}>
			<div className={classes.hover__detail}>
				<div className={classes.excerpt}>
					<p>{excerpt}</p>
				</div>
			</div>
			<Image
				src={imagePath}
				alt={title}
				width={350}
				height={250}
				sizes="100vw"
				style={{
					width: '100%',
					height: 'auto',
				}}
			/>
		</div>
		<div className={classes.content}>
			<div className={classes.content__title}>{title}</div>
			<div className={classes.content__create__time}>
				<time>{formattedDate}</time>
			</div>
		</div>
	</Link>
</article>
```

제 나름대로 클래스명을 명확하게 짓기 위해 노력했지만, 이 코드를 작성하고 몇 달 후에 마주한다면 처음부터 읽어가며 이 코드의 어떤 부분이 무엇을 의미하는지 고민하게 될 것입니다.  
(사실 몇 달 전만해도 저는 위의 코드가 그렇게 나쁘지 않다고 생각했을 것 입니다.)  
그럼 바로 제가 어떻게 수정했는지 코드로 보겠습니다.

---

## **\[수정 후 코드\]**

제가 수정 해 본 코드는 아래와 같습니다. 훨씬 명확해졌지 않나요?  
(참고로 @morphlib는 제가 만든 컴포넌트들이 담겨있는 디렉토리의 shortcut입니다.)

```js
import Card from '@morphlib/components/Card';

<Card
	href={linkPath}
	image={
		<Card.Image
			imagePath={imagePath}
			title={title}
			width={350}
			height={250}
			hoverText={excerpt}
		/>
	}
	description={<Card.Description title={title} creatTime={formattedDate} />}
/>;
```

제가 생각한 포스트카드 컴포넌트의 핵심로직은 **4가지** 입니다.

-   클릭 시, 해당 포스트 상세 페이지로 이동
-   Image를 보여주는 부분
-   이미지 하단의 description 부분
-   hover됐을 때 나오는 Text 표시

이러한 부분들을 명확하게 한눈에 볼 수 있도록 구성 해 봤습니다.  
또한 Card, CardImage, CardDescription는 항상 한 뭉치로 돌아다닐 것이기 때문에, import를 한번만 하기 위해 Card.Image, Card.Description 과 같은 방식으로 구조를 잡았습니다.

이 코드라면, 몇 달이 지나다시 돌아본다고 하더라도 한 눈에 파악하기 쉬울 것이라는 자신감이 듭니다! 또한 만약 이미지나 Description에 특정 이벤트를 걸려고 할 때에도 훨씬 처리가 편해질 것입니다.

---

# **사례 2(useForm 구현)**

사용자가 알 필요가 없는 부분들을 감추고, 핵심로직만 노출하여 클린하게 코드를 짜는 방법으로 customHook은 매우 좋은 방법 중 하나입니다. 이번에는 최근에 제가 만든 form을 validation하는 custom훅(**useForm**)을 보며 얘기를 해보려고 합니다.

이 훅을 디자인하면서 제가 기대한 **핵심 기능**은 아래와 같습니다.

-   form과 어떻게 유효성검사 규칙을 정한 zod의 schema를 인자로 넘길 수 있어야 한다.
-   해당 form이 현재 유효성 검사를 통과했는지 여부를 알 수 있어야 한다.
-   작성된 formData를 서버에 넘기기 편한 형태로 컨버팅 해주어야 한다.

#

그럼 이 훅을 실제 사용하는 모습을 한번 볼까요?

```js
export default function ContactForm() {
	//...
	const schema = z.object({
		email: z.string().email({ message: 'email 형식에 맞지 않습니다.' }),
		name: z.string().min(1, { message: '필수 입력 항목입니다.' }),
		message: z.string().min(1, { message: '필수 입력 항목입니다.' }),
	});
	const formRef = useRef<HTMLFormElement>(null);
	const { valid, formData } = useForm(formRef, schema);
    //...
    async function submitHandler(e: FormEvent) {
        e.preventDefault();
        if (!valid) return;
    //...
    }
```

이 훅을 사용할 때 앞서 언급한 위 3가지에 대해서만 집중하면 되고 내부 로직에 대해서는 더 이상 신경 쓰지 않아도 됩니다.  
유효성검사는 해당 훅에 위임하고, 그저 리턴된 valid 값을 이용하여 submit 하는 로직에 집중 할 수 있습니다.

#

물론, useForm을 더 추상화하여 코드 라인을 줄일 수도 있습니다.  
예를 들어, useForm() 호출만 하면 해당 페이지 form에 대해 유효성 검사를 진행하는 식으로요. 하지만 이런 상황에서는 이 useForm 훅의 핵심로직이 무엇인지 사용하는 입장에서 알기 힘들어집니다.

#

따라서 **무조건 코드를 줄이기 위해 전부** **추상화하는 것이 아니라, 적절하게 핵심 로직은 노출하고 불필요한 내부로 직은** **추상화**해야 합니다.

#

저는 이 방식으로 우리의 코드가 좀 더 클린 해질 수 있다고 생각합니다.  
물론 네이밍을 명확하게 짓는 것과 SRP와 같은 기본적인 부분 역시 너무 중요하지만, 너무 많이 들어보셨을 부분들이라 이번 포스트에서는 크게 다루지 않고, 제가 요즘 어떤 부분에 집중해서 코드를 작성하고 있는지에 대해 집중해서 정리해 보았습니다.

#

사실 아직 부족한 부분이 많기에 위의 내용이 부족하거나 틀린 내용이 있을 수도 있습니다. 이러한 부분이 있거나 궁금한 점이 있다면 언제든지 댓글로 남겨주세요! 감사합니다.

#

아! 혹시나 변수명, 함수명이 왜 중요한지 모르겠다! 라고 하신다면... 아랫부분도 읽어보시면 좋을 것 같습니다.

---

## **네이밍의 중요성**

함수명, 변수명을 명확하게 짓는 것은 클린한 코드를 짤 수 있는 가장 쉬우면서도 빠른 방법입니다.

가장 간단한 예시부터 시작 해 봅시다. 아래 코드만 보면 해당 버튼이 무엇을 전혀 하는지 알 수 없습니다. 결국 우리는 JSX쪽을 보고 있다가 스크롤을 올려 btnClickHandler가 무엇을 하는지 직접 읽어봐야 합니다. 그리고 그 함수에 가보면 정체를 알 수 없는 data가 무엇인지 알기 위해 다시 useState를 사용하고 있는 최상단 까지 올라가봐야 합니다.

```js
function btnClickHnadler() {
	setData((prev) => prev++);
}

//...

<div>
	클린한 코드 짜는 방법
	{data}
	<button onCLick={btnClickHnadler}>클릭</button>
</div>;
```

이러한 버튼이 한 페이지에 여러개가 있는 상황이라면, 더군다나 내가 짠 코드가 아니라면 해당 코드를 이해하기 점점 어려워 질 것입니다.

이러한 문제는 아래처럼 변수명만 명확히 지어도 해결할 수 있습니다.

```js
<div>
	클린한 코드 짜는 방법
	{likeCount}
	<button onCLick={() => setLikeCount((prev) => prev + 1)}>클릭</button>
</div>
```

자! 더 이상 해당 버튼이 어떤 역할을 하는지 위로 올라갔다 내려갔다 할 필요 없이 바로 알 수 있습니다.

이렇게 네이밍만 잘해도 반은 먹고 들어 갈 수 있기 때문에, 항상 네이밍을 잘하기 위해 고민 또 고민해야 할 것 같습니다!
