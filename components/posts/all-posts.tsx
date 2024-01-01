import PostsGrid from './posts-grid';
import classes from './all-posts.module.css';

type Post = {
	title: string;
	image: string;
	excerpt: string;
	date: string;
	slug: string;
};
type AllPostsProps = {
	posts: Post[];
};

export default function AllPosts({ posts }: AllPostsProps) {
	return (
		<section className={classes.posts}>
			<h1>All Posts</h1>
			<PostsGrid posts={posts} />
		</section>
	);
}
