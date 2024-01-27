'use client';

import { useRouter } from 'next/navigation';
import Top02 from '@morphlib/components/Top/Top02';
import Spacing from '@morphlib/components/Spacing';
import Button from '@morphlib/components/Button';
import InputWithLabel from '@morphlib/components/InputWithLabel';
import Text from '@morphlib/components/Text';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import showToast from '@/morph-lib/utils/toast';

export default function SignupForm() {
	const router = useRouter();
	const signupSchema = z
		.object({
			username: z.string().min(1, { message: '필수 입력 항목입니다.' }),
			password: z.string().min(1, { message: '필수 입력 항목입니다.' }),
			passwordCheck: z
				.string()
				.min(1, { message: '패스워드가 일치하지 않습니다.' }),
		})
		.refine((data) => data.password === data.passwordCheck, {
			path: ['passwordCheck'],
			message: '비밀번호가 일치하지 않습니다.',
		});

	type SignupPasswordCheckSchema = z.infer<typeof signupSchema>;
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
				{/* <input type="text" {...register('username')} />
				<input type="text" {...register('password')} />
				<input type="text" {...register('passwordCheck')} /> */}
				<InputWithLabel
					labelText="Username"
					htmlFor="username"
					register={{ ...register('username') }}
				/>
				<Text className="error__msg">{errors.username?.message}</Text>
				<Spacing size={15} />
				<InputWithLabel
					labelText="Password"
					htmlFor="password"
					type="password"
					register={{ ...register('password') }}
				/>
				<Text className="error__msg">{errors.password?.message}</Text>
				<Spacing size={15} />
				<InputWithLabel
					labelText="PasswordCheck"
					htmlFor="passwordCheck"
					type="password"
					register={{ ...register('passwordCheck') }}
				/>
				<Text className="error__msg">
					{errors.passwordCheck?.message}
				</Text>
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
