import { NextPage } from 'next';
import PostItem from './post-item';
import classes from './posts-grid.module.scss';

type Post = {
	title: string;
	image: string;
	excerpt: string;
	date: string;
	slug: string;
};
type PostsGridProps = {
	posts: Post[];
};

export default function PostsGrid({ posts }: PostsGridProps) {
	return (
		<div className={classes.grid}>
			{posts.map((post) => (
				<PostItem key={post.slug} post={post} />
			))}
			{/* {posts.map((post) => (
				<PostItem key={post.slug} post={post} />
			))}
			{posts.map((post) => (
				<PostItem key={post.slug} post={post} />
			))}
			{posts.map((post) => (
				<PostItem key={post.slug} post={post} />
			))}
			{posts.map((post) => (
				<PostItem key={post.slug} post={post} />
			))}
			{posts.map((post) => (
				<PostItem key={post.slug} post={post} />
			))}
			{posts.map((post) => (
				<PostItem key={post.slug} post={post} />
			))}
			{posts.map((post) => (
				<PostItem key={post.slug} post={post} />
			))} */}
		</div>
	);
}
