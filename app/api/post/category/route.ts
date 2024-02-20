import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

export async function GET(request: NextRequest, { params }: { params: any }) {
	console.log('params are ', params);
	const category = await prisma.category.findFirst({
		where: { name: params.categoryName },
	});

	let posts;
	if (category?.name === 'ALL') {
		posts = await prisma.post.findMany({
			include: {
				images: true,
				categories: true,
			},
		});
	} else {
		posts = await prisma.post.findMany({
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

	return NextResponse.json({ msg: 'Success', data: posts });
}

export async function POST(request: NextRequest) {
	const { categoryName } = await request.json();
	const category = await prisma.category.findFirst({
		where: { name: categoryName },
	});

	let posts;
	if (category?.name === 'ALL') {
		posts = await prisma.post.findMany({
			include: {
				images: true,
				categories: true,
			},
		});
	} else {
		posts = await prisma.post.findMany({
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

	return NextResponse.json({ msg: 'Success', data: posts });
}
