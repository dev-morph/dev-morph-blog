import prisma from '@/db';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const data = await request.json();
	console.log('GOT DATA ', data);
	const newComment: Prisma.CommentCreateInput = {
		username: data.username,
		post_id: data.post_id,
		comment: data.comment,
	};
	try {
		const result = await prisma.comment.create({
			data: newComment,
		});
		return new NextResponse(
			JSON.stringify({
				message: 'Success to post a new comment.',
				data: result,
			}),
			{ status: 200 }
		);
	} catch (error) {
		return new NextResponse(
			JSON.stringify({
				message: 'Failed to post a new comment.',
				error,
			}),
			{
				status: 209,
			}
		);
	}
}
