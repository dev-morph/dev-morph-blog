'use client';

import { useState, useRef, FormEvent } from 'react';
import { z } from 'zod';
import useForm from '@/morph-lib/hooks/useForm';

export default function LoginFunnel() {
	const formRef = useRef<HTMLFormElement>(null);
	const schema = z.object({
		id: z.string().min(1, { message: '필수 입력 항목입니다.' }),
		password: z.string().min(1, { message: '필수 입력 항목입니다.' }),
	});
	const { valid, formData } = useForm(formRef, schema);

	function loginSubmitHandler(e: FormEvent) {
		e.preventDefault();
		if (!valid) return;
		console.log(formData);
	}

	return (
		<>
			<form ref={formRef} onSubmit={loginSubmitHandler}>
				<div>
					<label htmlFor="id">ID</label>
					<input id="id" name="id" type="text" />
				</div>
				<div>
					<label htmlFor="password">PASSWORD</label>
					<input id="password" name="password" type="text" />
				</div>
				<button>로그인</button>
			</form>
		</>
	);
}
