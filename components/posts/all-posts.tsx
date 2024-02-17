import PostsGrid from './posts-grid';
import Spacing from '@morphlib/components/Spacing';
import CategoryChips from '../category-chips/CategoryChips';
import { getAllPosts } from '@/utils/posts-utils';
import { getAllCategories } from '@/utils/category-utils';

export default async function AllPosts() {
	const categories = await getAllCategories();
	const posts = await getAllPosts();

	return (
		<>
			<CategoryChips categories={categories} />
			<Spacing size="var(--size-8)" />
			<PostsGrid posts={posts} />
		</>
	);
}
