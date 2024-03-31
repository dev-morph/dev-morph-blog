import Avatar from '@/morph-lib/components/Avatar';
import { CommentType } from '@/types/comment_types';
import classes from './comment-item.module.scss';

type CommentItemProps = {
	comment: CommentType;
};

export default function CommentItem({ comment }: CommentItemProps) {
	return (
		<div className={classes.comment__item__group}>
			<Avatar
				imagePath="/images/user-icons/user1.svg"
				alt="userIcon"
			></Avatar>
			<div className={classes.comment__context}>
				<div className={classes.comment__header}>
					<div>{comment.username}</div>
					<div>{comment.created_at.toString()}</div>
				</div>
				<div className={classes.comment}>{comment.comment}</div>
			</div>
		</div>
	);
}
