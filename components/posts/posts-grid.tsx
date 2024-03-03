'use client';

import { useGetPostsByCategoryName } from '@/utils/query/post-queries';
import PostItem from './post-item';
import classes from './posts-grid.module.scss';

type PostsGridProps = {
	tagname: string;
};

export default function PostsGrid({ tagname }: PostsGridProps) {
	const { data: posts } = useGetPostsByCategoryName(tagname);

	if (posts?.error) return <h1>{posts.error}</h1>;
	if (posts?.success)
		return (
			<div className={classes.grid}>
				{posts.success.map((post) => (
					<PostItem key={post.id} post={post} />
				))}
			</div>
		);
}
