import PostsGrid from './posts-grid';
import Top01 from '@morphlib/components/Top/Top01';
import Spacing from '@morphlib/components/Spacing';

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
		<>
			<Top01 textAlign="center">All Posts</Top01>
			<Spacing size="var(--size-8)" />
			<PostsGrid posts={posts} />
		</>
	);
}
