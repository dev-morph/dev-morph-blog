'use client';

import Textarea from '@/morph-lib/components/Textarea';
import Top04 from '@/morph-lib/components/Top/Top04';
import Border from '@/morph-lib/components/Border';
import Spacing from '@/morph-lib/components/Spacing';
import Avatar from '@/morph-lib/components/Avatar';
import Button from '@/morph-lib/components/Button';
import { useForm } from 'react-hook-form';
import './new-comment.scss';
import { CommentSchema, commentSchema } from '@/schema/comment-schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function NewComment() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CommentSchema>({ resolver: zodResolver(commentSchema) });

	async function createNewComment(data: CommentSchema) {
		console.log('clicked! ', data);
	}
	return (
		<form onSubmit={handleSubmit(createNewComment)}>
			<Border verticalPadding={35} />
			<Top04>Add a comment</Top04>
			<Spacing size={15} />
			<div className="new__comment__section">
				<Avatar
					imagePath="/images/user-icons/user1.svg"
					alt="userIcon"
				></Avatar>
				<div className="new__comment__wrapper">
					<Textarea
						className="new__comment"
						register={register('comment')}
						placeholder="Add your comment here. Any comments are welcome! :)"
					/>
				</div>
			</div>
			<Spacing size={15} />
			<div className="new__comment__btn">
				<span className="error__msg">{errors.comment?.message}</span>
				<Button width="100px">Comment</Button>
			</div>
		</form>
	);
}
