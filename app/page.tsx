import Hero from '@/components/home-page/hero';
import FeaturedPost from '@/components/home-page/featured-post';
import { getFeaturedPosts } from '@/lib/posts-utils';

export default async function HomePage() {
	const posts = await getFeaturedPosts();

	return (
		<>
			<Hero />
			<FeaturedPost posts={posts} />
		</>
	);
}
