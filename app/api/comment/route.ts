import prisma from '@/db';
import { UpdateCommentType } from '@/types/comment_types';
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

export async function PATCH(request: NextRequest) {
	try {
		const data = (await request.json()) as UpdateCommentType;
		const { id, ...commentData } = data;
		const result = await prisma.comment.update({
			where: {
				id: data.id,
			},
			data: {
				...commentData,
			},
		});
		return new NextResponse(
			JSON.stringify({
				message: 'Success to update a new comment.',
				data: result,
			}),
			{
				status: 200,
			}
		);
	} catch (error) {
		return new NextResponse(
			JSON.stringify({
				message: 'Failed to update a new comment.',
				error,
			}),
			{
				status: 209,
			}
		);
	}
}

export async function DELETE(request: NextRequest) {
	const commentId = request.nextUrl.searchParams.get('commentId');

	if (!commentId) {
		return new NextResponse(
			JSON.stringify({
				message: `Failed to get commentId to DELETE comment.`,
			}),
			{ status: 200 }
		);
	}

	try {
		const result = await prisma.comment.delete({
			where: {
				id: +commentId,
			},
		});
		return new NextResponse(
			JSON.stringify({
				message: `Success to delete ${commentId} comment.`,
				data: result,
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return new NextResponse(
			JSON.stringify({
				message: `Failed to delete ${commentId} comment.`,
				error,
			}),
			{
				status: 209,
			}
		);
	}
}
