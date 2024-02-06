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
import FileInput from '@/morph-lib/components/FileInput';

type PostBodyType = {
	title: string;
	category: number;
	contents: string;
	thumbnail?: string;
	files?: File[];
};

export default function PostForm() {
	const router = useRouter();
	const { data: session } = useSession();
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const [files, setFiles] = useState<File[]>([]);
	const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
	const [selectedCategory, setSelectedCategory] = useState<
		null | string | number
	>(null);

	//TODO 임시 권한 체크를 위한 useEffect, 추후 navigationGuard로 변경
	useEffect(() => {
		if (!session?.user.role_id || +session?.user.role_id !== 1) {
			router.push('/');
			showToast({ message: '잘못된 접근입니다.', type: 'error' });
		}
	}, [router, session]);

	useEffect(() => {
		async function getAllCategories() {
			const { data } = await axios.get('/api/category');
			setCategories(data.data);
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

	async function publishNewPost(data: PostSchema) {
		const body: PostBodyType = {
			...data,
			category: selectedCategory as number,
			thumbnail: thumbnail?.name,
		};
		const formData = new FormData();
		for (const file of files) {
			formData.append('files', file);
		}

		const blob = new Blob([JSON.stringify(body)], {
			type: 'application/json',
		});
		formData.append('data', blob);

		const result = await axios.post('/api/post', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		console.log('result is ', result);
		if (result.data.msg === 'Success') {
			router.push('/');
		}
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
				placeholder="Choose Category"
				selectedValue={selectedCategory}
				onChange={setSelectedCategory}
				options={categories}
				label="name"
				value="id"
			/>
			<Spacing size={10} />
			<Textarea
				rows={15}
				errorMsg={errors.contents?.message}
				register={register('contents')}
			/>
			<Spacing size={10} />
			<FileInput
				files={files}
				setFiles={setFiles}
				thumbnail={thumbnail}
				setThumbnail={setThumbnail}
			/>
			<Spacing size={10} />
			<Button btnType="submit">POST</Button>
		</form>
	);
}
