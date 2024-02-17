import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: { categoryIds: number[] } }
) {
	const { categoryIds } = params;

	const posts = await prisma?.post.findMany({
		where: {
			categories: {
				some: {
					category_id: {
						in: categoryIds,
					},
				},
			},
		},
	});

	return NextResponse.json({ msg: 'Success', data: posts });
}

export async function POST(request: NextRequest) {
	const { categoryIds } = await request.json();
	const posts = await prisma?.post.findMany({
		where: {
			categories: {
				some: {
					category_id: categoryIds,
				},
			},
		},
	});

	return NextResponse.json({ msg: 'Success', data: posts });
}
