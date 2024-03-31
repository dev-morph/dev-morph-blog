import NewComment from './new-comment';
import CommentList from './comment-list';
import Border from '@/morph-lib/components/Border';

export default function CommentSection({ postId }: { postId: number }) {
	return (
		<>
			<NewComment postId={postId} />
			<Border verticalPadding={35} />
			<CommentList postId={postId} />
		</>
	);
}
