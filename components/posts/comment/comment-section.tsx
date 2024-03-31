'use client';

import NewComment from './new-comment';
import CommentList from './comment-list';
import { useParams } from 'next/navigation';
import Border from '@/morph-lib/components/Border';

export default function CommentSection() {
	const { slug: post_id } = useParams();

	return (
		<>
			<NewComment postId={+post_id} />
			<Border verticalPadding={35} />
			<CommentList postId={+post_id} />
		</>
	);
}
