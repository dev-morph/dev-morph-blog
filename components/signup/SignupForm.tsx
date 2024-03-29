'use client';

import { useRouter } from 'next/navigation';
import Top02 from '@morphlib/components/Top/Top02';
import Spacing from '@morphlib/components/Spacing';
import Button from '@morphlib/components/Button';
import InputWithLabel from '@morphlib/components/InputWithLabel';
import Text from '@morphlib/components/Text';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import showToast from '@/morph-lib/utils/toast';
import {
	signupSchema,
	type SignupPasswordCheckSchema,
} from '@/schema/signup-schema';

export default function SignupForm() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupPasswordCheckSchema>({
		resolver: zodResolver(signupSchema),
	});

	async function onSubmit(data: SignupPasswordCheckSchema) {
		try {
			const result = await axios.post('/api/user', data);
			if (result.status === 200) {
				router.push('/login');
				showToast({
					message: 'Signup has been completed. Please login.',
					type: 'success',
				});
				router.push('/login');
			} else {
				showToast({
					message: 'Failed to Signup. Please try again.',
					type: 'error',
				});
			}
		} catch (error) {
			showToast({
				message: 'Failed to Signup. Please try again.',
				type: 'error',
			});
		}
	}

	return (
		<>
			<Top02 textAlign="center">SignUp</Top02>
			<Spacing size={30} />
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputWithLabel
					labelText="Username"
					htmlFor="username"
					register={register('username')}
					errorMsg={errors.username?.message}
				/>
				<Spacing size={15} />
				<InputWithLabel
					labelText="Password"
					htmlFor="password"
					type="password"
					register={register('password')}
					errorMsg={errors.password?.message}
				/>
				<Spacing size={15} />
				<InputWithLabel
					labelText="PasswordCheck"
					htmlFor="passwordCheck"
					type="password"
					register={register('passwordCheck')}
					errorMsg={errors.passwordCheck?.message}
				/>
				<Spacing size={15} />
				<Button fontSize="var(--size-4)">Signup</Button>
			</form>
			<Spacing size={30} />
			<Text
				textAlign="center"
				size="0.75rem"
				color="rgba(3, 24, 50, 0.46)"
			>
				Already have an account?
			</Text>
			<Text
				textAlign="center"
				size="0.75rem"
				color="rgba(3, 24, 50, 0.9)"
				fontWeight="bold"
				styled={{ cursor: 'pointer', textDecoration: 'underline' }}
				onClick={() => router.push('/login')}
			>
				Login
			</Text>
		</>
	);
}
