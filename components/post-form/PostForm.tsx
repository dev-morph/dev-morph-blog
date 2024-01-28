'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import InputWithLabel from '@/morph-lib/components/InputWithLabel';
import Spacing from '@/morph-lib/components/Spacing';
import Button from '@/morph-lib/components/Button';
import showToast from '@/morph-lib/utils/toast';
import Select from '@/morph-lib/components/Select';
import { CategoryType } from '@/types/category_types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema, type PostSchema } from '@/schema/post-schema';
import Textarea from '@/morph-lib/components/Textarea';

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

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PostSchema>({
		resolver: zodResolver(postSchema),
	});

	function publishNewPost(data: PostSchema) {
		console.log('data is ', data);
	}

	return (
		<form onSubmit={handleSubmit(publishNewPost)}>
			<InputWithLabel
				htmlFor="title"
				labelText="title"
				errorMsg={errors.title?.message}
				register={register('title')}
			/>
			<Spacing size={10} />
			<Select
				placeholder={selectedCategory}
				onChange={setSelectedCategory}
				options={categories}
			/>
			<Spacing size={10} />
			<Textarea
				errorMsg={errors.content?.message}
				register={register('content')}
			/>
			<Spacing size={10} />
			<Button>POST</Button>
		</form>
	);
}
