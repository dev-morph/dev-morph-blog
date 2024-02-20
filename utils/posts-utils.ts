import axios from 'axios';
import prisma from '@/db';
import { PostType } from '@/types/post_types';

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
	const result = await prisma.post.findMany({
		include: {
			images: true,
			categories: true,
		},
	});

	return result;
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
	const category = await prisma.category.findFirst({
		where: { name: categoryName },
	});

	let posts;
	if (category?.name === 'ALL') {
		posts = await getAllPosts();
	} else {
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
	}

	return posts;
}

export async function getRecentPosts(): Promise<PostType[]> {
	const result = await prisma?.post.findMany({
		include: {
			images: true,
			categories: true,
		},
		orderBy: {
			created_at: 'desc',
		},
		take: 5,
	});

	return result;
}
