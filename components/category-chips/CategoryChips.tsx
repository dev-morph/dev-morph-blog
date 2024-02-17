'use client';

import Chips from '@/morph-lib/components/Chips';
import { CategoryType } from '@/types/category_types';
import { getPostByCategory } from '@/utils/posts-utils';
import { useRouter } from 'next/navigation';

export default function CategoryChips({
	categories,
	selectedTag,
}: {
	categories: CategoryType[];
	selectedTag?: CategoryType;
}) {
	const router = useRouter();

	return (
		<Chips>
			{categories.map((category) => (
				<Chips.Item
					key={category.id}
					style={{ cursor: 'pointer' }}
					className={
						selectedTag && selectedTag.id === category.id
							? 'selected'
							: ''
					}
					onClick={() => router.push(`/posts/tag/${category.name}`)}
				>
					{category.name}
				</Chips.Item>
			))}
		</Chips>
	);
}
