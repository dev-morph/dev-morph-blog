import PostsGrid from './posts-grid';
import Spacing from '@morphlib/components/Spacing';
import Chips from '@/morph-lib/components/Chips';
import { useEffect } from 'react';
import CategoryChips from '../category-chips/CategoryChips';
import axios from 'axios';
import { PostType } from '@/types/post_types';
import { getAllCategories } from '@/utils/category-utils';

type AllPostsProps = {
	posts: PostType[];
};

export default async function AllPosts({ posts }: AllPostsProps) {
	const categories = await getAllCategories();

	return (
		<>
			<CategoryChips categories={categories} />
			<Spacing size="var(--size-8)" />
			<PostsGrid posts={posts} />
		</>
	);
}
