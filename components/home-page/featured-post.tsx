import PostsGrid from '../posts/posts-grid';

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
			{/* <Top01 textAlign="center">Featured Posts</Top01> */}
			<div>alsdkfjalksdjf</div>
			{/* <Spacing size="var(--size-8)" /> */}
			{/* <PostsGrid posts={posts} /> */}
		</>
	);
}
