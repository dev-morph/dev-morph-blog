import { useGetComments } from '@/utils/query/comment-queires';
import CommentItem from './comment-item';
import { CommentType } from '@/types/comment_types';
import Spacing from '@/morph-lib/components/Spacing';

export default function CommentList({ postId }: { postId: number }) {
	const { data: comments } = useGetComments(postId);

	return (
		<>
			{comments?.map((comment: CommentType) => (
				<div key={comment.id}>
					<CommentItem comment={comment} />
					<Spacing size={20} />
				</div>
			))}
		</>
	);
}
