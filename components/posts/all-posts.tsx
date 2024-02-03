// 'use client';

import PostsGrid from './posts-grid';
import Spacing from '@morphlib/components/Spacing';
import Chips from '@/morph-lib/components/Chips';
import { useEffect } from 'react';
import axios from 'axios';
import { PostType } from '@/types/post_types';

type AllPostsProps = {
	posts: PostType[];
};

export default async function AllPosts({ posts }: AllPostsProps) {
	return (
		<>
			{/* <Chips>
				<Chips.Item>All</Chips.Item>
				<Chips.Item>React</Chips.Item>
				<Chips.Item>Next</Chips.Item>
				<Chips.Item>Springboot</Chips.Item>
				<Chips.Item>AWS</Chips.Item>
			</Chips> */}
			{/* <Spacing size="var(--size-8)" /> */}
			<PostsGrid posts={posts} />
		</>
	);
}
