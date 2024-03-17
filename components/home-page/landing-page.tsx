import Landing from '../landing/Landing';
import Section from '@/morph-lib/components/Section';
import RecentPosts from '../landing/RecentPosts';
import BusinessCard from '@/morph-lib/components/BusinessCard';
import { getRecentPosts } from '@/utils/posts-utils';
import { QueryClient } from '@tanstack/react-query';

export default async function FeaturedPost() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: [`recentPosts`],
		queryFn: async () => getRecentPosts(),
	});

	return (
		<>
			<Section>
				<Landing />
				<BusinessCard />
			</Section>
			{/* <Section>
				<RecentPosts />
			</Section> */}
		</>
	);
}
