'use client';

import Textarea from '@/morph-lib/components/Textarea';
import Top04 from '@/morph-lib/components/Top/Top04';
import Border from '@/morph-lib/components/Border';
import Spacing from '@/morph-lib/components/Spacing';
import Avatar from '@/morph-lib/components/Avatar';
import Button from '@/morph-lib/components/Button';
import Input from '@/morph-lib/components/Input';
import { useForm } from 'react-hook-form';
import './new-comment.scss';
import { CommentSchema, commentSchema } from '@/schema/comment-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostComment } from '@/utils/query/comment-queires';
import { useParams } from 'next/navigation';

export default function NewComment() {
	const addComment = usePostComment();

	const { slug: post_id } = useParams();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CommentSchema>({ resolver: zodResolver(commentSchema) });

	async function createNewComment(data: CommentSchema) {
		addComment.mutate({ ...data, post_id: +post_id });
	}

	return (
		<>
			<Border verticalPadding={35} />
			<form onSubmit={handleSubmit(createNewComment)}>
				<Top04>Add a comment</Top04>
				<Spacing size={15} />
				<div className="new__comment__section">
					<Avatar
						imagePath="/images/user-icons/user1.svg"
						alt="userIcon"
					></Avatar>
					<div className="new__comment__wrapper">
						<div className="user__info__wrapper">
							<Input
								type="text"
								placeholder="이름"
								htmlFor="comment__username"
								register={register('username')}
							/>
							{/* <input type="text" placeholder="이름" /> */}
							{/* <input type="text" placeholder="비밀번호" /> */}
						</div>
						<Spacing size={15} />
						<Textarea
							className="new__comment"
							register={register('comment')}
							placeholder="Add your comment here! Any comments are welcome:)"
						/>
					</div>
				</div>
				<Spacing size={15} />
				<div className="new__comment__btn">
					<span className="error__msg">
						{errors.comment?.message}
					</span>
					<span className="error__msg">
						{errors.username?.message}
					</span>
					<Button width="100px">Comment</Button>
				</div>
			</form>
		</>
	);
}
