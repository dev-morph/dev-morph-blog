import PostContent from '@/components/posts/post-detail/post-content';
import { getPostData } from '@/utils/posts-utils';
import { Metadata, ResolvingMetadata } from 'next';
import Top03 from '@/morph-lib/components/Top/Top03';

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
		return <Top03 textAlign="center">Failed to Find Post.</Top03>;
	}
	return <PostContent post={post} />;
}
