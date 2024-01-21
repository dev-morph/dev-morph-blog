import Link from 'next/link';
import Image from 'next/image';
import Text from '@morphlib/components/Text';
import Top04 from '@morphlib/components/Top/Top04';
import classes from './post-item.module.scss';
import Card from '@morphlib/components/Card';

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
		<>
			<Card
				href={linkPath}
				image={
					<Card.Image
						imagePath={imagePath}
						title={title}
						width={350}
						height={250}
						hoverText={excerpt}
					/>
				}
				description={
					<Card.Description title={title} creatTime={formattedDate} />
				}
			/>
		</>
	);
}
