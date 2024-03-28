import prisma from '@/db';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const data = await request.json();
	const newComment: Prisma.CommentCreateInput = {
		post_id: data.post_id,
		username: data.username,
		password: data.password,
		comment: data.comment,
	};
	try {
		console.log('newComment is ', newComment);
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
		console.log(error);
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
