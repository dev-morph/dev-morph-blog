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
import { CategoryType } from '@/types/category_types';

type Props = {
	params: { tagname: string; categories: CategoryType[] };
};

export async function generateStaticParams() {
	const categories = await getAllCategories();

	return categories.map((category) => ({
		tagname: category.name,
	}));
}

export default async function TagFilteredPage({ params }: Props) {
	const { tagname } = params;
	const queryClient = new QueryClient();

	const categories = await getAllCategories();
	const category = await getCategoryByName(tagname);

	if (!category) {
		return <NotFound />;
	}

	await queryClient.prefetchQuery({
		queryKey: [`postsByCategory/${tagname}`, tagname],
		queryFn: async () => getPostByCategoryName(tagname),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<CategoryChips categories={categories} selectedTag={category} />
			<Spacing size="var(--size-8)" />
			<PostsGrid tagname={params.tagname} />
		</HydrationBoundary>
	);
}
