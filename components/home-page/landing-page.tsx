'use client';

import PostsGrid from '../posts/posts-grid';
import Chips from '@/morph-lib/components/Chips';
import Spacing from '@/morph-lib/components/Spacing';
import { PostType } from '@/types/post_types';
import { getAllCategories } from '@/utils/category-utils';
import { useEffect, useState } from 'react';
import { CategoryType } from '@/types/category_types';
import { getAllPosts } from '@/utils/posts-utils';
import { getPostByCategory } from '@/utils/posts-utils';

export default function FeaturedPost() {
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
	const [posts, setPosts] = useState<PostType[]>([]);

	useEffect(() => {
		(async () => {
			const allCategories = await getAllCategories();
			setCategories(allCategories);

			const allPosts = await getAllPosts();
			setPosts(allPosts);
		})();
	}, []);

	function clickCategoryChip(categoryId: number) {
		setSelectedCategories((prev) => {
			const index = prev.findIndex((cId) => cId === categoryId);
			if (index >= 0) {
				return [
					...prev.slice(0, index),
					...prev.slice(index + 1, prev.length),
				];
			} else {
				return [...prev, categoryId];
			}
		});
	}

	useEffect(() => {
		(async () => {
			let filteredPosts;
			if (selectedCategories.length > 0) {
				filteredPosts = await getPostByCategory(selectedCategories);
			} else {
				filteredPosts = await getAllPosts();
			}
			setPosts(filteredPosts);
		})();
	}, [selectedCategories]);

	return (
		<>
			<Chips>
				{categories.map((category) => (
					<Chips.Item
						key={category.id}
						style={{ cursor: 'pointer' }}
						className={
							selectedCategories.findIndex(
								(el) => category.id === el
							) >= 0
								? 'selected'
								: ''
						}
						onClick={async () => {
							clickCategoryChip(category.id);
						}}
					>
						{category.name}
					</Chips.Item>
				))}
			</Chips>
			<Spacing size="var(--size-8)" />
			<PostsGrid posts={posts} />
		</>
	);
}
