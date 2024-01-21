import FeaturedPost from '@/components/home-page/featured-post';
import { getFeaturedPosts } from '@/utils/posts-utils';

export default async function HomePage() {
	const posts = await getFeaturedPosts();

	return (
		<>
			<FeaturedPost posts={posts} />
		</>
	);
}
