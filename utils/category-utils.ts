import axios from 'axios';
import { CategoryType } from '@/types/category_types';
import prisma from '@/db';
import { NextResponse } from 'next/server';

export async function getAllCategories() {
	// try {
	const result = await prisma.category.findMany();
	return result;
	// return new NextResponse(
	// 	JSON.stringify({
	// 		message: 'Success to get All Categories.',
	// 		data: result,
	// 	}),
	// 	{ status: 200 }
	// );
	// } catch (error) {
	// 	return new NextResponse(
	// 		JSON.stringify({
	// 			message: 'Failed to get All Categories.',
	// 			error,
	// 		}),
	// 		{
	// 			status: 209,
	// 		}
	// 	);
	// }

	// const { data } = await axios({
	// 	baseURL: process.env.API_BASE_URL,
	// 	url: `/api/category`,
	// 	method: 'GET',
	// });

	// return data.data as CategoryType[];
}
export async function getAllCategoriesFromServer() {
	const { data } = await axios({
		baseURL: process.env.API_BASE_URL,
		url: `/api/category`,
		method: 'GET',
	});

	return data.data as CategoryType[];
}

export async function getCategoryByName(category: string) {
	const result = await prisma.category.findFirst({
		where: {
			name: category,
		},
	});

	return result;
}

export async function getCategoryByNameFromServer(
	category: string
): Promise<CategoryType> {
	const { data } = await axios({
		baseURL: process.env.API_BASE_URL,
		url: `/api/category/${category}`,
	});

	return data.data;
}
