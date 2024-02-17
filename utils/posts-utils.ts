import matter from 'gray-matter';
import axios from 'axios';
import { PostType } from '@/types/post_types';

export async function getPostById(id: string): Promise<PostType> {
	const { data } = await axios({
		baseURL: process.env.API_BASE_URL,
		url: `/api/post/${id}`,
	});

	return data.data;
}

export async function getAllPosts() {
	const { data } = await axios({
		baseURL: process.env.API_BASE_URL,
		url: '/api/post',
	});
	return data.data;
}

export async function getPostByCategory(
	categoryIds: number
): Promise<PostType[]> {
	const { data } = await axios({
		baseURL: process.env.API_BASE_URL,
		url: `api/post/category`,
		method: 'POST',
		data: { categoryIds },
	});

	return data.data;
}

export async function getRecentPosts(): Promise<PostType[]> {
	const { data } = await axios({
		baseURL: process.env.API_BASE_URL,
		url: `api/post/recent`,
		method: 'GET',
	});

	return data.data;
}
