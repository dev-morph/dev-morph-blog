import Card from '@morphlib/components/Card';
import { PostType } from '@/types/post_types';

type PostItemProps = {
	post: PostType;
};

export default function PostItem({ post }: PostItemProps) {
	const { title, thumbnail, images, categories } = post;

	const imagePath = `${process.env.AWS_S3_BASE_URL}/${thumbnail}`;
	const linkPath = `/posts/${post.id}`;

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
						hoverText={'hmm'}
					/>
				}
				description={
					<Card.Description
						title={title}
						creatTime={post.created_at}
					/>
				}
			/>
		</>
	);
}
