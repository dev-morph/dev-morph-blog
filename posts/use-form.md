---
slug: use-form
title: 'Custom useForm 직접 만들기(feat. 이벤트 호출순서)'
date: '2024-01-20'
image: use-form.png
excerpt: custom useForm 만들기(feat.리액트 이벤트 호출순서, zod)
isFeatured: true
---

최근에 Next.js를 이용해서 내 블로그를 직접 만들고 있습니다. 작업하는 와중에 form 유효성 검사를 좀 간단히 할 수 있는 hook을 만들고 싶어져 zod를 활용하여 한번 만들어 보게 되었습니다. useForm이라는 라이브러리가 있는 것도 알고 있지만, 간단한 것은 직접 만드는게 좋아 직접 만들어 보게 되었고, 공유하고자 글을 정리해봅니다. 어떻게 구현했는지는 코드를 보면 알 수 있으니, **구현하면서 겪었던 문제점**과 **해당 문제점을 어떻게 해결했는지** 위주로 정리했습니다.

# **Features**

**우선, 완성된 form은 아래처럼 작동 하게 될 것입니다.**

![use-form 유효성검사](use-form.gif)

**useForm**이라는 커스텀 훅에서 제가 원하는 기능은 아래와 같습니다.

-   각 input을 유효성 체크하는 함수와 에러 메시지를 **zod.object**를 이용해 인자로 전달 할 수 있다.
-   submit 버튼을 클릭하기 전에는 유효성 검사를 진행하지 않는다.
-   submit 버튼을 클릭하면 유효성 검사를 진행하고, 실패한 인풋들은 빨간색 테두리를 부여한다.
-   submit 버튼 클릭 이후에는 input에 입력할 때마다, 유효성 체크를 진행한다.
-   유효성 검사 실패 시, z.object에 설정한 에러 메시지가 아래에 표시된다.
-   모든 인풋이 유효성 검사에 통과 했는지 여부를 알 수 있는 상태 값을 리턴 받는다.
-   form태그의 onSubmit에 전달된 함수의 로직은 유효성검사가 끝난 이후에 실행된다.

#

---

# **사용 방법**

**useForm hook은 아래처럼 사용 할 수 있습니다.**

1.  form 태그 안에 label과 input을 생성하고, label의 htmlFor과 input의 name과 id를 같은 값으로 입력해준다.
2.  form태그에 ref를 걸어준다.
3.  각 인풋들 유효성 체크로직을 **zod의 z.object를 활용하여 입력**해준다.  
    (이때, 에러 메시지는 { message } 형태로 넣어준다.)
4.  **useForm의 인자**로, **formRef와 zod.object**를 넣어 준다.
5.  useForm은 **form 전체가 유효성 검사에 통과했는지 여부를 리턴**한다.
6.  useForm의 리턴값으로, submitHandler에서 이후 로직을 진행할지 여부를 결정한다.

```js
const schema = z.object({
	email: z.string().email({ message: 'email 형식에 맞지 않습니다.' }),
	name: z.string().min(1, { message: '필수 입력 값 입니다.' }),
});
const formRef = useRef < HTMLFormElement > null;
const formValid = useFrom(formRef, schema);

function submitHandler(e: FormEvent) {
	e.preventDefault();

	if (!formValid) return;
	console.log('submitted!', formValid);
}

//JSX
<form onSubmit={submitHandler} ref={formRef} noValidate>
	<div className={classes.control}>
		<label htmlFor="email" className="required">
			Your Email
		</label>
		<input
			type="email"
			id="email"
			name="email"
			autoComplete="off"
			required
		/>
	</div>
	<div className={classes.control}>
		<label htmlFor="name" className="required">
			Your Name
		</label>
		<input type="text" id="name" name="name" autoComplete="off" />
	</div>
	<div className={classes.actions}>
		<button type="submit">Send Message</button>
	</div>
</form>;
```

이렇게 해주면, 위 영상에서처럼 작동하게 됩니다.

#

---

# **TroubleShootings**

## **1\. useRef 값 customHook에 넘기기(feat. lifecycle, useEffect)**

useForm에 인자로 **formElement**(formRef.current)를 넘겨줬는데, 처음에 null로 나왔습니다.

#

이때 제일 처음 든 생각은 아래처럼  **useEffect의 dependency에 formElement를 등록해주면 되겠네?** 였습니다.

```js
export default function useForm(formElement: HTMLFormElement | null, schema: z.ZodObject<any>){
//...
    useEffect(() => {
    if(!formElement) return;
    //formElement가 정상적으로 등록 된 경우 아래 로직 진행

    }, [formElement])
}

function TestComponent(){
	//...
	const formRef = useRef(null);
	useForm(formRef.current, shema);

    return(
    	<form ref={formRef}>
        //...
    )
}
```

하지만, [**리액트 공식문서**](https://react.dev/learn/escape-hatches#removing-effect-dependencies)에도 나와 있듯이, 리액트는 useRef.current의 변경은 알지 못합니다.

#

애초에 값의 변화가 있을 때, 리렌더가 일어나지 않기위해 만든 hook이니까요. 대신, 그 값의 변화는 useRef.current에 저장되어 있으니,  변화된 값을 언제든지 사용할 수 있습니다!

따라서 우리는 **formRef.current 처럼 값 자체가 아닌, formRef 객체 자체를 넘겨줘야 나중에 변화된 값을 사용할 수 있습니다.**

#

그럼 **실행 시점**이 중요 해 보입니다. 사실 useForm을 호출하는 시점 자체는 TestComponent가 **mount하기 이전 시점**이니까요.   
공식문서에 따르면, **useEffect 훅은 ComponentDidMount()가 일어난 이후에 실행**되게 됩니다.  
(물론, dependency를 빈 배열로 줬을때 입니다!, 위 코드처럼 인자를 넘긴다면, ComponentDidUpdate()이후에도 실행되게 됩니다.)

#

그럼 이제 모든 문제는 해결됐습니다! 컴포넌트가 어떻게 실행될지 아래를 참고해봅시다.

1.  formRef를 useRef를 이용해 생성한다.(formRef.current는 여전히 null인 상태)
2.  useForm을 호출한다.  
    이때, **useForm**(formRef, shema)처럼 객체를 통으로 넘겨줘야 합니다. 이 시점에도 여전히 formRef.current는 null 입니다.
3.  return 문을 통해 해당 컴포넌트가 렌더된다.(**ComponentDidMount() → formRef.current에 DOM요소**가 들어가게 됩니다.)
4.  useForm안에 등록되어 있던 useEffect가 호출된다. (formRef.current를 통해 DOM 요소에 접근 가능하다.)

그래서 최종적으로 코드는 아래처럼 구현하였습니다.

```js
export default function useForm(formRef: RefObject<HTMLFormElement | null>, schema: z.ZodObject<any>){
//...
    useEffect(() => {
    const formElement = formRef.current
    if(!formElement) return;
    //formElement가 정상적으로 등록 된 경우 아래 로직 진행

    }, [formRef])
}

function TestComponent(){
	//...
	const formRef = useRef(null);
	useForm(formRef, shema);

    return(
    	<form ref={formRef}>
        //...
    )
}
```

근데, 이 로직대로라면, useEffect안에 formRef 의존성을 추가 안해줘도 되는 거 아닌가? 라는 생각이 드실 수 있습니다.

#

하지만, 그렇게 하면, lint에서 경고를 주기 때문에, 일단 추가를 해주었습니다. 이렇게 해도 사실상 formRef가 변경되는 일은 없기 때문에, 사이드이펙트는 없다고 판단하였습니다.

#

---

## **2\. submit시점 처리 (다수의 이벤트 핸들러 순서 처리)**

처음 이 훅을 구현하기 위해 디자인하면서, 아래처럼 form태그의 onSubmit을 통해서 사이드이펙트를 처리하고자 했습니다.

#

그리고, 처음부터 validation을 체크하는 것이 아니라 **버튼이 클릭된 이후** 유효성검사를 실시하고자 했죠.

```js
const formValid = useFrom(formRef, schema);

<form
    className={classes.form}
    onSubmit={submitHandler}
    ref={formRef}
    noValidate
>
```

이때의 문제점은, **validation과 submitHandler 둘 다 submit이벤트를 통해 실행**되지만, **submitHandler가 validation이 모두 마친 뒤에 실행되어야 한다는 점**이었습니다.  
그래야, validation의 결과인 formValid를 통해서 form을 제출할 지 여부를 결정할 수 있으니까요.

#

우선, 제가 알고있기로 eventListner는 **등록된 순서대로**(FIFO) 호출되고 있었습니다. 하지만 React는 브라우저 기본 이벤트가 아닌, [**ReactEventObject(synthetic event)**](https://react.dev/reference/react-dom/components/common#react-event-object)를 사용하기에 조금 찾아봐야 했습니다.

#

아래는 브라우저에서 이벤트 리스너를 확인해본 모습입니다. (dev모드라, 2번씩 등록되어 있습니다.)  
button에 등록된 2개의 이벤트(33, 36 line)는 제가 addEventListner로 등록한 이벤트핸들러이고, document에 등록된 이벤트는 onClick으로 React 이벤트를 등록한 이벤트 핸들러입니다.

#

![이벤트호출 순서 Image](event-call-order.png)

이처럼 React는 브라우저 기본 이벤트처럼 각 Dom요소에 이벤트리스너를 추가하는 것이 아니라, root(docuemnt)요소에 모두 등록을 합니다. 이렇게 되면 간단해 졌습니다. 먼저 자기에게 걸린 이벤트 핸들러를 먼저 실행시키고, 부모에 걸려있는 이벤트핸들러를 실행시키기 때문입니다.

#

그럼 아래처럼 이벤트를 등록했을 때, 이벤트 동작순서는 어떻게 될까요?

```js
function clickHandler() {
	console.log('react Event handler!');
}

useEffect(() => {
	console.log('useEffect');
	const testbtn = document.querySelector('#test');
	console.log('testbtn is', testbtn);
	testbtn?.addEventListener('click', () => {
		console.log('native first function');
	});
	testbtn?.addEventListener('click', () => {
		console.log('native last function');
	});
}, []);

//jsx
<button id="test" onClick={clickHandler}>
	click
</button>;
```

결과는 아래와 같습니다.(역시나 dev모드라 두번씩 실행되었습니다.)

#

![이벤트호출 결과 Image](event-call-result.png)

버튼이 클릭되게 되면, 자신에게 가장 먼저 걸려있는 이벤트 리스너부터 실행 시키고, 그 다음에 자신에게 add된 이벤트 리스너, 그 다음에 리액트 이벤트핸들러로 등록된 이벤트가 실행되게 됩니다.

#

결국 저는 아래처럼 코드를 구현하였습니다.

1.  form에 onSubmit 이벤트 등록  
    (validation이 모두 끝난 이후에 실행된다.)
2.  useForm 내부에서 form요소를 찾아 addEventListener("submit", validateForm) 해준다.(1번보다 먼저 실행)

Next.js를 시작한지 지금 몇 일 되지 않아, 부족하거나 잘못된 점이 있을 수 있습니다.   
잘못된 점이나 궁금한점에 대해서 댓글로 알려주신다면 감사합니다!

---

# **구현 코드**

전체 구현 코드는 아래와 같습니다.

```js
import { z } from 'zod';
import { RefObject, useEffect, useState } from 'react';

export default function useFrom(
	formRef: RefObject<HTMLFormElement | null>,
	schema: z.ZodObject<any>
) {
	const ERROR_MSG_ID_PREFIX = 'error__msg__';
	const [formStatus, setFormStatus] = useState<{ [key: string]: boolean }>(
		{}
	);
	const [isFirst, setIsFirst] = useState(true);
	const [formValid, setFormValid] = useState(false);
	const [formData, setFormData] = useState<{ [key: string]: any }>({});

	useEffect(() => {
		const formElement = formRef.current;
		let removeSubmitEventListener: null | Function = null;

		function checkFormValidHandler() {
			const values = Object.values(formStatus);
			return (
				values.length > 0 &&
				Object.values(formStatus).every((valid) => valid === true)
			);
		}

		function addSubmitEventListenerHandler(formElement: HTMLFormElement) {
			// submit 버튼 클릭 할 때, 실행 되는 함수.
			function handleSubmit(event: SubmitEvent) {
				const target = event.target as HTMLFormElement;
				if (target) {
					setIsFirst(false);
					if (isFirst) {
						addValidateELHandler(target, schema);
					}

					if (checkFormValidHandler()) {
						setFormValid(true);
					} else {
						setFormValid(false);
					}
				}
			}

			formElement.addEventListener('submit', handleSubmit);

			return () => {
				formElement.removeEventListener('submit', handleSubmit);
			};
		}

		function addValidateELHandler(
			formElement: HTMLFormElement,
			schema: z.ZodObject<any>
		) {
			const inputs = formElement.querySelectorAll('input');
			const textareas = formElement.querySelectorAll('textarea');

			for (const input of inputs) {
				//처음 submit 버튼 클릭했을 때, validate.
				validateInputHandler(input, schema);
				setEventHandler(input, schema);
			}

			for (const textarea of textareas) {
				validateInputHandler(textarea, schema);
				//이후 input 이벤트 마다 validate 하도록 eventListenr 추가.
				setEventHandler(textarea, schema);
			}
		}

		function setEventHandler(
			inputEl: HTMLInputElement | HTMLTextAreaElement,
			schema: z.ZodObject<any>
		) {
			//validate eventHandler
			inputEl.addEventListener('input', () =>
				validateAndSetFormDataHandler(inputEl, schema)
			);
		}

		function validateAndSetFormDataHandler(
			input: HTMLInputElement | HTMLTextAreaElement,
			schema: z.ZodObject<any>
		) {
			setFormDataHandler(input);
			validateInputHandler(input, schema);
		}

		function setFormDataHandler(
			input: HTMLInputElement | HTMLTextAreaElement
		) {
			const targetId = input.id;
			setFormData((prev) => {
				return {
					...prev,
					[targetId]: input.value,
				};
			});
		}

		function validateInputHandler(
			input: HTMLInputElement | HTMLTextAreaElement,
			schema: z.ZodObject<any>
		) {
			const targetId = input.id;

			const response = schema
				.pick({ [targetId]: true })
				.safeParse({ [targetId]: input.value });

			if (!response.success) {
				setFormStatus((prev) => {
					return {
						...prev,
						[targetId]: false,
					};
				});
				const { errors } = response.error;
				input.classList.add('invalid');
				addErrorMsgElement(input, targetId, errors);
			} else {
				setFormStatus((prev) => {
					return {
						...prev,
						[targetId]: true,
					};
				});
				input.classList.remove('invalid');
				input.parentElement
					?.querySelector(`#${ERROR_MSG_ID_PREFIX}${targetId}`)
					?.remove();
			}
		}

		if (formElement) {
			removeSubmitEventListener =
				addSubmitEventListenerHandler(formElement);
			//required 별표 표시는 label에 global css를 적용
			//제출 버튼을 눌렀을 때 부터 input 요소들에게 맞는 validation 해야 한다.
		}

		return () => {
			if (removeSubmitEventListener) {
				removeSubmitEventListener();
			}
		};
	}, [formRef, schema, isFirst, formStatus]);

	function addErrorMsgElement(
		inputEl: HTMLInputElement | HTMLTextAreaElement,
		targetId: String,
		errors: z.ZodIssue[]
	) {
		const errorMsgEl = inputEl.parentElement?.querySelector(
			`#${ERROR_MSG_ID_PREFIX}${targetId}`
		);

		if (errorMsgEl) {
			errorMsgEl.innerHTML = errors[0].message;
		} else {
			const errorMsg = document.createElement('span');
			errorMsg.id = `${ERROR_MSG_ID_PREFIX}${targetId}`;
			errorMsg.className = 'error__msg';
			errorMsg.innerHTML = errors[0].message;
			inputEl.parentElement?.insertAdjacentElement('beforeend', errorMsg);
		}
	}

	return { valid: formValid, formData: formData };
}
```

#

아, 참고로 아래처럼 global css를 적용해줘야 위 영상처럼 작동 할 수 있습니다.

```css
input:focus {
	outline: none;
}

label.required {
	&::after {
		content: ' *';
		color: rgb(249, 77, 77);
		font-size: 1rem;
	}
}

.invalid {
	border: 1px solid red !important;
}
.error__msg {
	color: red;
	font-size: 1rem;
}
```

---

## **주의점**

사실, 위 코드를 보시면 아시겠지만, 일반적인 input과 textarea들에 대해서만 validation 체크가 진행되고, 나머지 케이스에는 작동하지 않습니다. 이 부분은 추후 개발할 예정입니다.
