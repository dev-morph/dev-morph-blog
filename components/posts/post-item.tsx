import Link from 'next/link';
// import Image from 'next/legacy/image';
import Image from 'next/image';
import classes from './post-item.module.scss';

type Post = {
	title: string;
	image: string;
	excerpt: string;
	date: string;
	slug: string;
};

type PostItemProps = {
	post: Post;
};

export default function PostItem({ post }: PostItemProps) {
	const { title, image, excerpt, date, slug } = post;
	const formattedDate = new Date(date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	const imagePath = `/images/posts/${slug}/${image}`;
	const linkPath = `/posts/${slug}`;

	return (
		<article className={classes.post}>
			<Link href={linkPath}>
				<div className={classes.image}>
					<div className={classes.hover__detail}>
						<div className={classes.excerpt}>
							<p>{excerpt}</p>
						</div>
					</div>
					<Image
						src={imagePath}
						alt={title}
						width={350}
						height={250}
						sizes="100vw"
						style={{
							width: '100%',
							height: 'auto',
						}}
					/>
				</div>
				<div className={classes.content}>
					<h3>{title}</h3>
					<time>{formattedDate}</time>
				</div>
			</Link>
		</article>
	);
}
