import { useMutation, useQuery } from '@tanstack/react-query';
import {
	CommentType,
	NewCommentType,
	UpdateCommentType,
} from '@/types/comment_types';
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
			commentId,
			password,
		}: {
			commentId: number;
			password: string;
		}) => deleteComment(commentId, password),
		onSuccess({ data }) {
			queryClient.setQueryData(
				['comments', postId],
				(old: CommentType[]) => old.filter((o) => o.id !== data.data.id)
			);
		},
		onError(error) {
			console.log('failed to delete comment.', error.message);
			alert('비밀번호가 틀렸습니다.');
			// this.throwOnError;
		},
	});
}

export async function deleteComment(commentId: number, password: string) {
	const { data: passwordValid } = await validateCommentPassword({
		commentId,
		password,
	});

	if (passwordValid.data) {
		return await axios.delete('/api/comment', {
			params: { commentId },
		});
	} else {
		return passwordValid.data;
	}
}

// **********************************************************
// ******************** UPDATE Comments *********************
// **********************************************************
export function useUpdateComment() {
	const queryClient = getQueryClient();
	return useMutation({
		mutationFn: (comment: UpdateCommentType) => updateComment(comment),
	});
}

export async function updateComment(comment: UpdateCommentType) {
	const { data: response } = await axios.patch('/api/comment', { comment });
	console.log('got response ', response);
}

// **********************************************************
// *************** Validate Comments Password ***************
// **********************************************************

export function useValidateComentPassword(commentId: number, password: string) {
	return useMutation({
		mutationFn: ({
			commentId,
			password,
		}: {
			postId: number;
			commentId: number;
			password: string;
		}) =>
			validateCommentPassword({
				commentId,
				password,
			}),
		onSuccess({ data }) {
			console.log('validate success data is ', data);
		},
	});
}

export async function validateCommentPassword({
	commentId,
	password,
}: {
	commentId: number;
	password: string;
}) {
	return await axios.post('/api/comment/password', {
		commentId,
		password,
	});
}
