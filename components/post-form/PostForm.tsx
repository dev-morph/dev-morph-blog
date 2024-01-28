'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import InputWithLabel from '@/morph-lib/components/InputWithLabel';
import Spacing from '@/morph-lib/components/Spacing';
import Button from '@/morph-lib/components/Button';
import showToast from '@/morph-lib/utils/toast';
import Select from '@/morph-lib/components/Select';
import { CategoryType } from '@/types/category_types';

export default function PostForm() {
	const router = useRouter();
	const { data: session } = useSession();
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('Choose Category');

	//TODO 임시 권한 체크를 위한 useEffect, 추후 navigationGuard로 변경
	useEffect(() => {
		if (!session?.user.role || +session?.user.role !== 1) {
			router.push('/');
			showToast({ message: '잘못된 접근입니다.', type: 'error' });
		}
	}, [router, session]);

	useEffect(() => {
		async function getAllCategories() {
			const { data } = await axios.get('/api/category');
			setCategories(
				data.data.map((category: CategoryType) => category.name)
			);
		}

		getAllCategories();
	}, []);

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

	function publishNewPost(data: SignupPasswordCheckSchema) {
		console.log('data is ', data);
	}

	return (
		<form onSubmit={handleSubmit(publishNewPost)}>
			<InputWithLabel htmlFor="title" labelText="title" />
			<Spacing size={10} />
			<Select
				placeholder={selectedCategory}
				onChange={setSelectedCategory}
				options={categories}
			/>
			<Spacing size={10} />
			<textarea
				name=""
				id=""
				cols={30}
				rows={28}
				style={{ width: '100%' }}
			></textarea>
			{categories.map((category: any) => category.name)}
			<Button>POST</Button>
		</form>
	);
}
