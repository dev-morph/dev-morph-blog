import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params;

	const result = await prisma?.post.findUnique({
		where: {
			id: +id,
		},
		include: {
			images: true,
			categories: true,
		},
	});
	return NextResponse.json({ msg: 'Success', data: result });
}
