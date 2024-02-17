import PostItem from './post-item';
import classes from './posts-grid.module.scss';
import { PostsBasedCategoryType } from '@/types/post_types';

type PostsGridProps = {
	posts: PostsBasedCategoryType[];
};

export default function PostsGrid({ posts }: PostsGridProps) {
	return (
		<div className={classes.grid}>
			{posts.map((post) => (
				<PostItem key={post.id} post={post} />
			))}
		</div>
	);
}
