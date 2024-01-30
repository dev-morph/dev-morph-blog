import prisma from '@/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	try {
		const result = await prisma.category.findMany();
		return new NextResponse(
			JSON.stringify({
				message: 'Success to get All Categories.',
				data: result,
			}),
			{ status: 200 }
		);
	} catch (error) {
		return new NextResponse(
			JSON.stringify({
				message: 'Failed to get All Categories.',
			}),
			{
				status: 209,
			}
		);
	}
}
