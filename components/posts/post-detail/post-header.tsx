import classes from './post-header.module.scss';

type PostHeaderProps = {
	title: string;
	image: string;
	date: string;
};

export default function PostHeader({ title, image, date }: PostHeaderProps) {
	return (
		<header className={classes.header}>
			<div className={classes.title}>
				<h1>{title}</h1>
			</div>
			<div className={classes.post__meta__data}>
				<time>{date}</time>
			</div>
		</header>
	);
}
