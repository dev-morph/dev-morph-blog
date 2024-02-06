import AllPosts from '@/components/posts/all-posts';
import { getAllPosts } from '@/utils/posts-utils';

export default async function PostsPage() {
	const posts = await getAllPosts();

	return <AllPosts posts={posts} />;
}
