'use client';

import { useState, useRef, FormEvent } from 'react';
import Top02 from '@/morph-lib/components/Top/Top02';
import Spacing from '@/morph-lib/components/Spacing';
import { z } from 'zod';
import useForm from '@/morph-lib/hooks/useForm';
import Button from '@/morph-lib/components/Button';
import InputWithLabel from '@/morph-lib/components/InputWithLabel';

export default function LoginFunnel() {
	const formRef = useRef<HTMLFormElement>(null);
	const schema = z.object({
		username: z.string().min(1, { message: '필수 입력 항목입니다.' }),
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
			<Top02 textAlign="center">Welcome</Top02>
			<Spacing size={30} />
			<form ref={formRef} onSubmit={loginSubmitHandler}>
				<InputWithLabel labelText="Username" htmlFor="username" />
				<Spacing size={15} />
				<InputWithLabel labelText="Password" htmlFor="password" />
				<Spacing size={15} />
				<Button
					onClick={() => console.log('hmmm')}
					fontSize="var(--size-4)"
				>
					로그인
				</Button>
			</form>
		</>
	);
}
