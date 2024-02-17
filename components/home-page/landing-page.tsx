import Spacing from '@/morph-lib/components/Spacing';
import Landing from '../landing/Landing';
import Section from '@/morph-lib/components/Section';
import RecentPosts from '../landing/RecentPosts';
import { getRecentPosts } from '@/utils/posts-utils';

export default async function FeaturedPost() {
	const posts = await getRecentPosts();
	return (
		<>
			<Section>
				<Landing />
			</Section>
			<Section>
				<RecentPosts posts={posts} />
			</Section>
		</>
	);
}
