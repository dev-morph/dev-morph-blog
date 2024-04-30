'use server';

import prisma from '@/utils/db/mysql-prisma-db';
import elasticClient from './db/elastic-db';

export async function getPostById(id: string) {
	const result = await prisma?.post.findUnique({
		where: {
			id: +id,
		},
		include: {
			images: true,
			categories: true,
		},
	});
	return result;
}

export async function getAllPosts() {
	const posts = await prisma.post.findMany({
		include: {
			images: true,
			categories: true,
		},
	});
	return posts;
}

export async function getPostByCategory(categoryIds: number) {
	const category = await prisma.category.findUnique({
		where: { id: categoryIds },
	});

	let posts;
	if (category?.name === 'ALL') {
		posts = await getAllPosts();
	} else {
		posts = await prisma?.post.findMany({
			where: {
				categories: {
					some: {
						category_id: categoryIds,
					},
				},
			},
			include: {
				images: true,
				categories: true,
			},
		});
	}

	return posts;
}
export async function getPostByCategoryName(categoryName: string) {
	let category;
	try {
		category = await prisma.category.findFirst({
			where: { name: categoryName },
		});
	} catch (error) {
		return { error: `Failed to find ${category} category!` };
	}

	let posts;
	if (category?.name === 'ALL') {
		try {
			posts = await getAllPosts();
		} catch (error) {
			return { error: `Failed getAllPosts!` };
		}
	} else {
		try {
			posts = await prisma?.post.findMany({
				where: {
					categories: {
						some: {
							category_id: category?.id,
						},
					},
				},
				include: {
					images: true,
					categories: true,
				},
			});
		} catch (error) {
			return { error: `Failed find Posts in ${category}!` };
		}
	}

	if (!posts) return { error: 'No Posts!' };
	return { success: posts };
}

export async function getRecentPosts() {
	let posts;
	try {
		posts = await prisma?.post.findMany({
			include: {
				images: true,
				categories: true,
			},
			orderBy: {
				id: 'desc',
			},
			take: 5,
		});
	} catch (error) {
		return { error: 'Failed to get recent posts!' };
	}

	return { success: posts };
}
