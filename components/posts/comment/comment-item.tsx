'use client';

import Avatar from '@/morph-lib/components/Avatar';
import DetailBtn from '@/morph-lib/components/DetailBtn';
import { CommentType } from '@/types/comment_types';
import classes from './comment-item.module.scss';
import { getFormatedDate } from '@/morph-lib/utils/dateUtils';
import { useDeleteComment } from '@/utils/query/comment-queires';
// import Modal from '@/morph-lib/components/Modal';
import { useState } from 'react';
import useModal from '@/morph-lib/hooks/useModal';

type CommentItemProps = {
	comment: CommentType;
};

export default function CommentItem({ comment }: CommentItemProps) {
	const { mutate } = useDeleteComment(comment.post_id, comment.id);
	const { Modal, openDialog, closeDialog } = useModal();
	const [isOpen, setIsOpen] = useState(false);

	function editHandler() {
		console.log('Edit!');
	}
	function deleteHandler() {
		console.log('Delete!');
		openDialog();
		mutate({ postId: comment.post_id, commentId: comment.id });
	}

	{
		return (
			comment.id && (
				<div className={classes.comment__item__group}>
					<Modal>
						<span>Text</span>
						<span>Text</span>
						<span>Text</span>
					</Modal>
					{/* {isOpen && <Modal  />} */}
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
