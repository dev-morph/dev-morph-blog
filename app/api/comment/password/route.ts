import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

interface RequestBody {
	postId: number;
	commentId: number;
	password: string;
}

export async function POST(request: NextRequest) {
	const data: RequestBody = await request.json();

	try {
		const comment = await prisma.comment.findUnique({
			where: {
				id: data.commentId,
			},
		});

		if (comment?.password === data.password) {
			return new NextResponse(
				JSON.stringify({
					message: 'Password Correct.',
					data: true,
				}),
				{ status: 200 }
			);
		} else {
			return new NextResponse(
				JSON.stringify({
					message: 'Invalid Password.',
					data: false,
				}),
				{ status: 200 }
			);
		}
	} catch (error) {
		console.log(error);
		return new NextResponse(
			JSON.stringify({
				message: 'Failed to validate password.',
				error,
			}),
			{
				status: 209,
			}
		);
	}
}
