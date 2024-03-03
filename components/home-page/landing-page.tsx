import Landing from '../landing/Landing';
import Section from '@/morph-lib/components/Section';
import RecentPosts from '../landing/RecentPosts';
import BusinessCard from '@/morph-lib/components/BusinessCard';
import { getRecentPosts } from '@/utils/posts-utils';

export default async function FeaturedPost() {
	const posts = await getRecentPosts();
	return (
		<>
			<Section>
				<Landing />
				<BusinessCard />
			</Section>
			<Section>
				<RecentPosts posts={posts} />
			</Section>
		</>
	);
}
