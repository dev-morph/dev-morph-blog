import { useMutation, useQuery } from '@tanstack/react-query';
import { CommentType, NewCommentType } from '@/types/comment_types';
import axios from 'axios';
import prisma from '@/db';
import { Prisma } from '@prisma/client';

export function usePostComment() {
	return useMutation({
		mutationFn: (comment: NewCommentType) => postComment(comment),
	});
}

export async function postComment(comment: NewCommentType) {
	const result = await axios.post('/api/comment', comment);
	console.log('posted comment! ', result);
	return result;
}

//

export function useGetComments(postId: number) {
	return useQuery({
		queryFn: () => getComments(postId),
		queryKey: ['comments', postId],
	});
}

export async function getComments(postId: number): Promise<CommentType[]> {
	const { data } = await axios.get(`/api/comment/`, { params: { postId } });
	return data.data;
}
