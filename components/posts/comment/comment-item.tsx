import Avatar from '@/morph-lib/components/Avatar';
import DetailIcon from '@/components/ui/icons/detail-icon';
import DetailBtn from '@/morph-lib/components/DetailBtn';
import { CommentType } from '@/types/comment_types';
import classes from './comment-item.module.scss';
import dayjs from 'dayjs';

type CommentItemProps = {
	comment: CommentType;
};

export default function CommentItem({ comment }: CommentItemProps) {
	{
		return (
			comment.id && (
				<div className={classes.comment__item__group}>
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
									{dayjs(
										comment.created_at.toString()
									).format('YYYY-MM-DD HH:mm:ss')}
								</div>
							</div>
							<DetailBtn className={classes.detail__btn} />
							{/* <DetailIcon className={classes.detail__btn} /> */}
						</div>
						<div className={classes.comment}>{comment.comment}</div>
					</div>
				</div>
			)
		);
	}
}
