'use client';

import Avatar from '@/morph-lib/components/Avatar';
import DetailBtn from '@/morph-lib/components/DetailBtn';
import { CommentType } from '@/types/comment_types';
import classes from './comment-item.module.scss';
import {
	getCommentFormatedDate,
	getFormatedDate,
} from '@/morph-lib/utils/dateUtils';
import {
	useDeleteComment,
	validateCommentPassword,
} from '@/utils/query/comment-queires';
import useModal from '@/morph-lib/hooks/useModal';
import Text from '@/morph-lib/components/Text';
import Spacing from '@/morph-lib/components/Spacing';
import { useRef, useState } from 'react';
import EditComment from './edit-comment';

type CommentItemProps = {
	comment: CommentType;
};

export default function CommentItem({ comment }: CommentItemProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const { mutate: deleteComment } = useDeleteComment(
		comment.post_id,
		comment.id
	);
	const {
		Modal: DeleteModal,
		openDialog: openDeleteDialog,
		closeDialog: closeDeleteDialog,
	} = useModal({
		confirmCallback: confirmDeleteHandler,
		cancleCallback: cancleDeleteHandler,
	});
	const {
		Modal: EditModal,
		openDialog: openEditDialog,
		closeDialog: closeEditDialog,
	} = useModal({
		confirmCallback: confirmEditHandler,
		cancleCallback: cancleEditHandler,
	});

	function editHandler() {
		openEditDialog();
	}
	function deleteHandler() {
		openDeleteDialog();
	}

	async function confirmDeleteHandler() {
		const password = inputRef.current?.value;
		if (password) {
			deleteComment({
				commentId: comment.id,
				password: password,
			});
			closeDeleteDialog();
		}
	}
	function cancleDeleteHandler() {
		closeDeleteDialog();
	}

	async function confirmEditHandler() {
		const password = inputRef.current?.value;
		if (password) {
			const { data: response } = await validateCommentPassword({
				commentId: comment.id,
				password: password,
			});

			if (!response.data) {
				alert('비밀번호가 틀렸습니다.');
			} else {
				setIsEditMode(true);
			}
			cancleEditHandler();
		}
	}

	function cancleEditHandler() {
		closeEditDialog();
	}

	{
		return (
			<>
				<DeleteModal
					title={<Text>Delete Comment</Text>}
					body={
						<>
							<Text>
								To confirm, please enter the comment password.
							</Text>
							<Spacing size={20} />
							<div
								style={{
									display: 'grid',
								}}
							>
								<input
									ref={inputRef}
									type="password"
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
				<EditModal
					title={<Text>Edit Comment</Text>}
					body={
						<>
							<Text>
								To confirm, please enter the comment password.
							</Text>
							<Spacing size={20} />
							<div
								style={{
									display: 'grid',
								}}
							>
								<input
									ref={inputRef}
									type="password"
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

				{isEditMode ? (
					<EditComment
						setIsEditMode={setIsEditMode}
						comment={comment}
					/>
				) : (
					<div className={classes.comment__item__group}>
						<Avatar
							imagePath={
								comment.avatar_image
									? comment.avatar_image
									: '/images/user-icons/user1.svg'
							}
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
										{getCommentFormatedDate(
											comment.updated_at?.toString()
										)}
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
							<div className={classes.comment}>
								{comment.comment}
							</div>
						</div>
					</div>
				)}
			</>
		);
	}
}
