import Avatar from '@/morph-lib/components/Avatar';
import Button from '@/morph-lib/components/Button';
import Input from '@/morph-lib/components/Input';
import Spacing from '@/morph-lib/components/Spacing';
import Textarea from '@/morph-lib/components/Textarea';
import Top04 from '@/morph-lib/components/Top/Top04';
import { CommentSchema, commentSchema } from '@/schema/comment-schema';
import { useUpdateComment } from '@/utils/query/comment-queires';
import { zodResolver } from '@hookform/resolvers/zod';
import { register } from 'module';
import { useForm } from 'react-hook-form';
import classes from './edit-comment.module.scss';
import { CommentType } from '@/types/comment_types';

export default function EditComment({
	setIsEditMode,
	comment,
}: {
	setIsEditMode: Function;
	comment: CommentType;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CommentSchema>({ resolver: zodResolver(commentSchema) });

	const { mutate: patchComment } = useUpdateComment();
	async function updateComment(data: CommentSchema) {
		console.log('PATCH!');
		// patchComment(data, {
		// 	onSuccess: (data) => {
		// 		reset();
		// 	},
		// });
	}

	function cancleClickHandler() {
		console.log('CANCLE!');
		setIsEditMode(false);
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

	return (
		<div className={classes.comment__edit__group}>
			<Avatar
				imagePath="/images/user-icons/user1.svg"
				alt="userIcon"
			></Avatar>
			<form
				onSubmit={handleSubmit(updateComment)}
				className={classes.edit__comment__form}
			>
				<div className={classes.comment__context}>
					<div className={classes.comment__header}>
						<div className={classes.header__infos__wrapper}>
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
					</div>
					<Textarea
						className="new__comment"
						register={register('comment')}
						placeholder="Add your comment here! Any comments are welcome:)"
					/>
				</div>
				<Spacing size={15} />
				<div className="new__comment__btn">
					<span className="error__msg">{getErrorMsg()}</span>
					<Button
						width="100px"
						onClick={cancleClickHandler}
						btnType="button"
					>
						Cancle
					</Button>
					<Button width="100px">Edit</Button>
				</div>
			</form>
		</div>
	);
}
