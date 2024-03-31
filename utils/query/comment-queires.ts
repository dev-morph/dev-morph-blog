import { useMutation, useQuery } from '@tanstack/react-query';
import { CommentType, NewCommentType } from '@/types/comment_types';
import axios from 'axios';
import { getQueryClient } from '@/components/provider/QueryProvider';

// **********************************************************
// ******************** POST New Comment ********************
// **********************************************************
export function usePostComment(postId: number) {
	const queryClient = getQueryClient();
	return useMutation({
		mutationFn: (comment: NewCommentType) => postComment(comment),
		onSuccess({ data }) {
			queryClient.setQueryData(['comments', postId], (old: any) => {
				return [...old, data.data];
			});
		},
	});
}

export async function postComment(comment: NewCommentType) {
	const result = await axios.post('/api/comment', comment);
	return result;
}

// **********************************************************
// ********************** GET Comments **********************
// **********************************************************
export function useGetComments(postId: number) {
	return useQuery({
		queryKey: ['comments', postId],
		queryFn: () => getComments(postId),
	});
}

export async function getComments(postId: number): Promise<CommentType[]> {
	const { data } = await axios.get(`/api/comment/`, { params: { postId } });
	return data.data;
}

// **********************************************************
// ******************** DELETE Comments *********************
// **********************************************************
export function useDeleteComment(postId: number, commentId: number) {
	const queryClient = getQueryClient();
	return useMutation({
		mutationFn: ({
			postId,
			commentId,
		}: {
			postId: number;
			commentId: number;
		}) => deleteComment(postId, commentId),
		onSuccess({ data }) {
			console.log('success data is ', data);
			queryClient.setQueryData(['comments', postId], (old: any) => {
				console.log('old is ', old);
				return [...old];
			});
		},
	});
}

export async function deleteComment(postId: number, commentId: number) {
	console.log('deleteComment!');
	return await axios.delete('/api/comment', {
		params: { commentId, postId },
	});
}
