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
import { signIn } from 'next-auth/react';
import showToast from '@/morph-lib/utils/toast';

export default function LoginForm() {
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
		const result = await signIn('credentials', {
			username: formData?.username,
			password: formData?.password,
			redirect: false,
		});

		if (result?.error) {
			showToast({
				message: 'Failed to Login. Please try again.',
				type: 'error',
			});
		} else {
			showToast({
				message: 'Login has been completed.',
				type: 'success',
			});
			router.push('/');
		}
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
			<Spacing size={30} />
			<Text
				textAlign="center"
				size="0.75rem"
				color="rgba(3, 24, 50, 0.46)"
			>
				Or Sign Up Using
			</Text>
			<Text
				textAlign="center"
				size="0.75rem"
				color="rgba(3, 24, 50, 0.9)"
				fontWeight="bold"
				styled={{ cursor: 'pointer', textDecoration: 'underline' }}
				onClick={() => router.push('/signup')}
			>
				Sign Up
			</Text>
		</>
	);
}
