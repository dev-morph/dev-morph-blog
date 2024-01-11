import PostContent from '@/components/posts/post-detail/post-content';
import { getPostData } from '@/lib/posts-utils';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
	params: { slug: string };
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const slug = params.slug;
	const post = getPostData(slug);

	return {
		title: post.title,
		description: post.excerpt,
	};
}

export default async function PostDetailPage({
	params,
}: {
	params: { slug: string };
}) {
	const slug = params.slug;
	const post = getPostData(slug);
	if (!post) {
		return <div>Failed to Find Post.</div>;
	}
	return (
		<main>
			<PostContent post={post} />;
		</main>
	);
}
