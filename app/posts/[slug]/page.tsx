import PostContent from '@/components/posts/post-detail/post-content';
import { getPostData } from '@/lib/posts-utils';

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
	return <PostContent post={post} />;
}
