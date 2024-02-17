import { getPostById } from '@/utils/posts-utils';
import { getPostByCategory } from '@/utils/posts-utils';
import { getAllCategories, getCategoryByName } from '@/utils/category-utils';
import PostsGrid from '@/components/posts/posts-grid';
import CategoryChips from '@/components/category-chips/CategoryChips';
import Spacing from '@/morph-lib/components/Spacing';

type Props = {
	params: { tagname: string };
};

export default async function TagFilteredPage({ params }: Props) {
	const categories = await getAllCategories();
	const category = await getCategoryByName(params.tagname);
	if (!category) {
		return <div>404</div>;
	}

	const posts = await getPostByCategory(category.id);

	return (
		<>
			<CategoryChips categories={categories} selectedTag={category} />
			<Spacing size="var(--size-8)" />
			<PostsGrid posts={posts} />
		</>
	);
}
