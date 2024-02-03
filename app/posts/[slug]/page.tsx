import PostContent from '@/components/posts/post-detail/post-content';
import { getPostData, getPostById } from '@/utils/posts-utils';
import { Metadata, ResolvingMetadata } from 'next';
import axios from 'axios';
import Top03 from '@morphlib/components/Top/Top03';

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
		title: post.title,
		description: post.title,
	};
}

export default async function PostDetailPage({ params }: Props) {
	const slug = params.slug;
	const post = await getPostById(slug);
	return <PostContent post={post} />;
}
