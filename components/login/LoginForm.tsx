'use client';

import { useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Top02 from '@morphlib/components/Top/Top02';
import Spacing from '@morphlib/components/Spacing';
import { z } from 'zod';
import useForm from '@morphlib/hooks/useForm';
import Button from '@morphlib/components/Button';
import InputWithLabel from '@morphlib/components/InputWithLabel';
import Text from '@morphlib/components/Text';
import { signIn, signOut } from 'next-auth/react';

export default function LoginFunnel() {
	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);
	const schema = z.object({
		username: z.string().min(1, { message: '필수 입력 항목입니다.' }),
		password: z.string().min(1, { message: '필수 입력 항목입니다.' }),
	});
	const { valid, formData } = useForm(formRef, schema);

	async function loginSubmitHandler(e: FormEvent) {
		e.preventDefault();

		if (!valid) return;
		await signIn('credentials', {
			username: formData?.username,
			password: formData?.password,
			redirect: true,
			callbackUrl: '/',
		});
	}

	return (
		<>
			<Top02 textAlign="center">Welcome</Top02>
			<Spacing size={30} />
			<form ref={formRef} onSubmit={loginSubmitHandler}>
				<InputWithLabel labelText="Username" htmlFor="username" />
				<Spacing size={15} />
				<InputWithLabel
					labelText="Password"
					htmlFor="password"
					type="password"
				/>
				<Spacing size={15} />
				<Button fontSize="var(--size-4)">Login</Button>
			</form>
			{/* <Spacing size={30} />
			<Text
				textAlign="center"
				size="0.75rem"
				color="rgba(3, 24, 50, 0.46)"
			>
				Or Sign Up Using
			</Text> */}
		</>
	);
}
