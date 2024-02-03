import AllPosts from '@/components/posts/all-posts';
import { getAllPosts, getAllRealPosts } from '@/utils/posts-utils';
import axios from 'axios';

async function getAllPosts2() {
	const { data } = await axios.get('http://localhost:3000/api/post');
	return data.data;
}

export default async function PostsPage() {
	// const posts = await getAllPosts();
	const posts = await getAllPosts2();

	// return <div>hoi</div>;
	return <AllPosts posts={posts} />;
}
