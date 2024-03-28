import { useMutation, useQuery } from '@tanstack/react-query';
import { NewCommentType } from '@/types/comment_types';
import axios from 'axios';

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
