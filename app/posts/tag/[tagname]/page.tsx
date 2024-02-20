import { getPostByCategoryName } from '@/utils/posts-utils';
import { getAllCategories, getCategoryByName } from '@/utils/category-utils';
import PostsGrid from '@/components/posts/posts-grid';
import CategoryChips from '@/components/category-chips/CategoryChips';
import Spacing from '@/morph-lib/components/Spacing';
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from '@tanstack/react-query';
import NotFound from '@/app/not-found';

type Props = {
	params: { tagname: string };
};

export default async function TagFilteredPage({ params }: Props) {
	const queryClient = new QueryClient();

	const categories = await getAllCategories();
	const category = await getCategoryByName(params.tagname);
	if (!category) {
		return <NotFound />;
	}

	const posts = await queryClient.fetchQuery({
		queryKey: ['postsByCategory'],
		queryFn: async () => getPostByCategoryName(params.tagname),
		staleTime: 1000 * 3, //ms
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<CategoryChips categories={categories} selectedTag={category} />
			<Spacing size="var(--size-8)" />
			<PostsGrid posts={posts} tagname={params.tagname} />
		</HydrationBoundary>
	);
}
