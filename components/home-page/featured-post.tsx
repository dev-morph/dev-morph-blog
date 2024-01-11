import Image from 'next/image';
import PostsGrid from '../posts/posts-grid';
import classes from '@/components/home-page/featured-post.module.scss';

type Post = {
	slug: string;
	title: string;
	image: string;
	excerpt: string;
	date: string;
};
type FeaturedPostProps = {
	posts: Post[];
};

export default function FeaturedPost({ posts }: FeaturedPostProps) {
	return (
		<section className={classes.latest}>
			<h2>Featured Posts</h2>
			<PostsGrid posts={posts} />
		</section>
	);
}
