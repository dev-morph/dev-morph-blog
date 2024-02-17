import AllPosts from '@/components/posts/all-posts';
import { getAllPosts } from '@/utils/posts-utils';

// export const dynamic = 'force-static';
// export const dynamic = 'force-dynamic';
// export const revalidate = 3600;

export default async function PostsPage() {
	return <AllPosts />;
}
// return <AllPosts posts={posts} />;
