'use client';

import Chips from '@/morph-lib/components/Chips';
import { CategoryType } from '@/types/category_types';
import { getPostByCategory } from '@/utils/posts-utils';

export default function CategoryChips({
	categories,
}: {
	categories: CategoryType[];
}) {
	return (
		<Chips>
			{categories.map((category) => (
				<Chips.Item
					key={category.id}
					style={{ cursor: 'pointer' }}
					onClick={async () => console.log('hoi')}
				>
					{category.name}
				</Chips.Item>
			))}
		</Chips>
	);
}
