import classes from './post-header.module.css';

type PostHeaderProps = {
	title: string;
	image: string;
};

export default function PostHeader({ title, image }: PostHeaderProps) {
	return (
		<header className={classes.header}>
			<h1>{title}</h1>
		</header>
	);
}
