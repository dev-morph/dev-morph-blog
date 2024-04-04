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
import { useState } from 'react';

export default function NewComment({ postId }: { postId: number }) {
	const [avatarIndex, setAvatarIndex] = useState<number>(1);
	const [isAvatarEdit, setIsAvatarEdit] = useState(false);
	const avatarIndexes = [1, 2, 3, 4, 5, 6, 7];
	const avatarPathPrefix = '/images/user-icons/user';
	const avatarPathSuffix = '.svg';

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CommentSchema>({ resolver: zodResolver(commentSchema) });

	const { mutate } = usePostComment(postId);
	async function createNewComment(data: CommentSchema) {
		mutate(
			{
				...data,
				post_id: postId,
				avatar_image: avatarPathPrefix + avatarIndex + avatarPathSuffix,
			},
			{
				onSuccess: (data) => {
					reset();
				},
			}
		);
	}

	function getErrorMsg() {
		if (errors?.username?.message) {
			return errors?.username?.message;
		} else if (errors?.password?.message) {
			return errors?.password?.message;
		} else if (errors?.comment?.message) {
			return errors?.comment?.message;
		}
	}

	// useEffect(() => {
	// 	setAvatarIndex(getRandomNumber(1, 7));
	// }, []);

	function test() {
		console.log('hoihoih');
	}
	return (
		<>
			<Border verticalPadding={35} />
			<form onSubmit={handleSubmit(createNewComment)}>
				<Top04>Add a comment</Top04>
				<Spacing size={15} />
				<div className="new__comment__section">
					<div className="avatar__wrapper">
						<div onClick={() => setIsAvatarEdit(!isAvatarEdit)}>
							<Avatar
								// imagePath={`/images/user-icons/user${avatarIndex}.svg`}
								imagePath={
									avatarPathPrefix +
									avatarIndex +
									avatarPathSuffix
								}
								alt="userIcon"
							></Avatar>
						</div>

						{isAvatarEdit && (
							<div className="avatar__options">
								{avatarIndexes.map((index) => (
									<div
										key={index}
										onClick={() => {
											setAvatarIndex(index);
											setIsAvatarEdit(false);
										}}
									>
										<Avatar
											// imagePath={`/images/user-icons/user${avatarIndex}.svg`}
											imagePath={
												avatarPathPrefix +
												index +
												avatarPathSuffix
											}
											alt="userIcon"
										></Avatar>
									</div>
								))}
							</div>
						)}
					</div>
					<div className="new__comment__wrapper">
						<div className="user__info__wrapper">
							<Input
								type="text"
								placeholder="닉네임"
								htmlFor="comment__username"
								register={register('username')}
							/>
							<Input
								type="password"
								placeholder="비밀번호"
								htmlFor="comment__password"
								register={register('password')}
							/>
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
					<span className="error__msg">{getErrorMsg()}</span>
					<Button width="100px">Comment</Button>
				</div>
			</form>
		</>
	);
}
