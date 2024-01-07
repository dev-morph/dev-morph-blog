import AllPosts from '@/components/posts/all-posts';
import { getAllPosts } from '@/lib/posts-utils';

export default async function PostsPage() {
	const posts = await getAllPosts();

	return (
		<section>
			<AllPosts posts={posts} />
		</section>
	);
}
