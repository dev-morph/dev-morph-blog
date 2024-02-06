import axios from 'axios';
import { CategoryType } from '@/types/category_types';

export async function getAllCategories() {
	const { data } = await axios({
		baseURL: process.env.API_BASE_URL,
		url: `/api/category`,
		method: 'GET',
	});

	return data.data as CategoryType[];
}
