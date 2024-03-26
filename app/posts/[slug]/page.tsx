import CommentSection from '@/components/posts/comment/comment-section';
import PostContent from '@/components/posts/content/post-content';
import { getPostById } from '@/utils/posts-utils';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
	params: { slug: string };
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const slug = params.slug;
	const post = await getPostById(slug);

	return {
		title: post?.title,
		description: post?.title,
	};
}

export default async function PostDetailPage({ params }: Props) {
	const slug = params.slug;
	const post = await getPostById(slug);
	if (!post) {
		return <div>There is no such Post!</div>;
	} else {
		return (
			<>
				<PostContent post={post} />
				<CommentSection />
			</>
		);
	}
}
