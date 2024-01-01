import Link from 'next/link';
import Image from 'next/image';
import classes from './post-item.module.css';

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
		<li className={classes.post}>
			<Link href={linkPath}>
				<div className={classes.image}>
					<Image
						src={imagePath}
						alt={title}
						style={{
							width: '100%',
							height: 'auto',
						}}
						width={300}
						height={200}
						// nextjs 14부터는 layout 쓰지 않는다.
						// layout="responsive"
					/>
				</div>
				<div className={classes.content}>
					<h3>{title}</h3>
					<time>{formattedDate}</time>
					<p>{excerpt}</p>
				</div>
			</Link>
		</li>
	);
}
