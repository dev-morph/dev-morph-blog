import PostsGrid from '../posts/posts-grid';
import Top01 from '@morphlib/components/Top/Top01';
import Spacing from '@morphlib/components/Spacing';

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
		<>
			<Top01 textAlign="center">Featured Posts</Top01>
			<Spacing size="var(--size-8)" />
			<PostsGrid posts={posts} />
		</>
	);
}
