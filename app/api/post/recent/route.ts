import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db/mysql-prisma-db';

export async function GET(request: NextRequest) {
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
	return NextResponse.json({ msg: 'Success', data: result });
}
