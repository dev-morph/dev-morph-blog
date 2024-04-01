'use client';

import Avatar from '@/morph-lib/components/Avatar';
import DetailBtn from '@/morph-lib/components/DetailBtn';
import { CommentType } from '@/types/comment_types';
import classes from './comment-item.module.scss';
import { getFormatedDate } from '@/morph-lib/utils/dateUtils';
import {
	useDeleteComment,
	validateCommentPassword,
} from '@/utils/query/comment-queires';
import useModal from '@/morph-lib/hooks/useModal';
import Text from '@/morph-lib/components/Text';
import Spacing from '@/morph-lib/components/Spacing';
import { useRef } from 'react';

type CommentItemProps = {
	comment: CommentType;
};

export default function CommentItem({ comment }: CommentItemProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const { mutate: deleteComment } = useDeleteComment(
		comment.post_id,
		comment.id
	);
	const { Modal, openDialog, closeDialog } = useModal({
		confirmCallback: confirmHandler,
		cancleCallback: cancleHandler,
	});

	function editHandler() {
		console.log('Edit!');
	}
	function deleteHandler() {
		console.log('Delete!');
		openDialog();
	}

	async function confirmHandler() {
		const password = inputRef.current?.value;
		if (password) {
			deleteComment({
				commentId: comment.id,
				password: inputRef.current?.value,
			});

			closeDialog();
		}
	}
	function cancleHandler() {
		closeDialog();
	}

	{
		return (
			comment.id && (
				<div className={classes.comment__item__group}>
					<Modal
						title={<Text>Delete Comment</Text>}
						body={
							<>
								<Text>
									To confirm, please enter the comment
									password.
								</Text>
								<Spacing size={20} />
								<div
									style={{
										display: 'grid',
									}}
								>
									<input
										ref={inputRef}
										type="text"
										placeholder="Type the password when you create this comment."
										style={{
											border: '1px solid var(--border-default-color)',
											outline: 'none',
											minHeight: '1.75rem',
										}}
									/>
								</div>
							</>
						}
					/>

					<Avatar
						imagePath="/images/user-icons/user1.svg"
						alt="userIcon"
					></Avatar>
					<div className={classes.comment__context}>
						<div className={classes.comment__header}>
							<div className={classes.author__info}>
								<div className={classes.username}>
									{comment.username}
								</div>
								<div className={classes.time}>
									commented on{' '}
									{getFormatedDate({
										date: comment.created_at.toString(),
										format: 'YYYY-MM-DD HH:mm:ss',
									})}
								</div>
							</div>
							<DetailBtn
								className={classes.detail__btn}
								commandItems={[
									{
										label: '수정',
										clickHandler: editHandler,
									},
									{
										label: '삭제',
										clickHandler: deleteHandler,
									},
								]}
							/>
						</div>
						<div className={classes.comment}>{comment.comment}</div>
					</div>
				</div>
			)
		);
	}
}
