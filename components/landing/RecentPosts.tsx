'use client';

import Carousel from '@/morph-lib/components/Carousel';
import { PostType } from '@/types/post_types';
import { useRouter } from 'next/navigation';
import Top03 from '@morphlib/components/Top/Top03';
import Text from '@morphlib/components/Text';
import Spacing from '@morphlib/components/Spacing';
import { useGetRecentPosts } from '@/utils/query/post-queries';

type RecentPostsProps = {
	posts: PostType[];
};

// export default function RecentPosts({ posts }: RecentPostsProps) {
export default function RecentPosts() {
	const router = useRouter();
	const { data: posts } = useGetRecentPosts();

	return (
		<>
			<Top03>Recent Posts</Top03>
			<Spacing size={10} />
			<Text>See Recently Uploaded Posts!</Text>
			<Spacing size={30} />
			{posts?.error && <h1>{posts.error}</h1>}
			{posts?.success && (
				<Carousel
					items={posts?.success?.map((post, idx) => (
						<Carousel.Item
							imagePath={`${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/${post.thumbnail}`}
							title={post.title}
							imgAlt={post.title}
							idx={idx}
							onClick={() => router.push(`/posts/${post.id}`)}
							key={post.id}
						/>
					))}
				></Carousel>
			)}
		</>
	);
}
