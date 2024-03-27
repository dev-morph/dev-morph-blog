import { useMutation, useQuery } from '@tanstack/react-query';
import { postComment } from '../comment-utils';
import { NewCommentType } from '@/types/comment_types';

export function usePostComment() {
	return useMutation({
		mutationFn: (comment: NewCommentType) => postComment(comment),
	});
}
