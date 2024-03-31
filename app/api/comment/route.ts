import prisma from '@/db';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const postId = request.nextUrl.searchParams.get('postId');
	if (!postId) {
		return new NextResponse(
			JSON.stringify({
				message: 'postId should be number. it can not be null.',
			}),
			{
				status: 209,
			}
		);
	}
	try {
		const result = await prisma.comment.findMany({
			where: {
				post_id: +postId,
			},
		});

		const comments = result.map((c) => {
			const { password, ...comment } = c;
			return comment;
		});

		return new NextResponse(
			JSON.stringify({
				message: 'Success to get comments.',
				data: comments,
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return new NextResponse(
			JSON.stringify({
				message: 'Failed to get comments.',
				error,
			}),
			{
				status: 209,
			}
		);
	}
}
export async function POST(request: NextRequest) {
	const data = await request.json();
	const newComment: Prisma.CommentCreateInput = {
		post_id: data.post_id,
		username: data.username,
		password: data.password,
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

export async function DELETE(request: NextRequest) {
	const postId = request.nextUrl.searchParams.get('postId');
	const commentId = request.nextUrl.searchParams.get('commentId');

	// const newComment: Prisma.CommentCreateInput = {
	// 	post_id: data.post_id,
	// 	username: data.username,
	// 	password: data.password,
	// 	comment: data.comment,
	// };
	try {
		// const result = await prisma.comment.create({
		// 	data: newComment,
		// });
		return new NextResponse(
			JSON.stringify({
				message: `Success to delete ${commentId} comment from ${postId} post.`,
				// data: result,
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return new NextResponse(
			JSON.stringify({
				message: `Failed to delete ${commentId} comment from ${postId} post.`,
				error,
			}),
			{
				status: 209,
			}
		);
	}
}
