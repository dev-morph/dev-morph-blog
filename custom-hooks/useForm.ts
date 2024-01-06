import { object, z } from 'zod';
import { FormEvent, RefObject, useEffect, useState } from 'react';
import { FormValidationType } from '@/types/form_types';
import { CommonCode } from '@/constants/common_code';

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

	useEffect(() => {
		const formElement = formRef.current;
		let removeSubmitEventListener: null | Function = null;

		function checkFormValidHandler() {
			return Object.values(formStatus).includes(false) ? false : true;
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
			const formData = new FormData(formElement);
			const inputs = formElement.querySelectorAll('input');
			const formObject = getFormDataObject(formData);
			const response = schema.safeParse(formObject);

			for (const input of inputs) {
				//처음 submit 버튼 클릭했을 때, validate.
				validateInputHandler(input, schema);
				//이후 input 이벤트 마다 validate 하도록 eventListenr 추가.
				input.addEventListener('input', () =>
					validateInputHandler(input, schema)
				);
			}
		}

		function validateInputHandler(
			input: HTMLInputElement,
			schema: z.ZodObject<any>
		) {
			const targetId = input.id;
			const test = schema.pick({ [targetId]: true });

			const response = schema
				.pick({ [targetId]: true })
				.safeParse({ [targetId]: input.value });

			if (!response.success) {
				formStatus[targetId] = false;
				const { errors } = response.error;
				input.classList.add('invalid');
				addErrorMsgElement(input, targetId, errors);
			} else {
				formStatus[targetId] = true;
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
		inputEl: HTMLInputElement,
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

	return formValid;
}

function getFormDataObject(formData: FormData) {
	const result: { [key: string]: any } = {};
	let keys = formData.keys();
	//'IterableIterator<string>' 형식은 '--downlevelIteration' 플래그 또는 'es2015' 이상의 '--target'을 사용하는 경우에만 반복할 수 있습니다.
	//에러 발생하면 tsconfig에서 "target": "esnext",처럼 es6 이상 버전으로 올려주면 된다.
	for (const key of keys) {
		result[key] = formData.get(key);
	}
	return result;
}
