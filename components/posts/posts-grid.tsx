'use client';

import { useGetPostsByCategoryName } from '@/utils/query/post-queries';
import PostItem from './post-item';
import classes from './posts-grid.module.scss';
import { PostsBasedCategoryType } from '@/types/post_types';

type PostsGridProps = {
	posts: PostsBasedCategoryType[];
	tagname: string;
};

export default function PostsGrid({ tagname }: PostsGridProps) {
	const { data: posts, isError } = useGetPostsByCategoryName(tagname);
	return (
		<div className={classes.grid}>
			{posts &&
				posts.map((post) => <PostItem key={post.id} post={post} />)}
		</div>
	);
}
