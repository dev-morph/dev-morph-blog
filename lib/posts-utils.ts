import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type PostMetaData = {
	slug: string;
	title: string;
	image: string;
	excerpt: string;
	date: string;
	content: string;
	isFeatured: boolean;
};

const dirPath = path.join(process.cwd(), 'posts');

export function getPostData(postIdentifier: string) {
	const postSlug = postIdentifier.replace(/\.md$/, '');
	const filePath = path.join(process.cwd(), 'posts', `${postSlug}.md`);
	const fileContent = fs.readFileSync(filePath, 'utf-8');

	const { data, content } = matter(fileContent);

	const postData: PostMetaData = {
		slug: postSlug,
		date: data.date,
		title: data.title,
		image: data.image,
		excerpt: data.excerpt,
		isFeatured: data.isFeatured,
		content,
	};

	return postData;
}

export async function getAllPosts() {
	const postFiles = fs.readdirSync(dirPath);
	const allPosts = postFiles.map((postFile) => getPostData(postFile));

	const sortedPosts = allPosts.sort((postA, postB) =>
		postA.date > postB.date ? -1 : 1
	);

	return sortedPosts;
}

export async function getFeaturedPosts() {
	const allPosts = await getAllPosts();
	return allPosts.filter((post) => post.isFeatured);
}

export async function getPostBySlug(slug: string) {
	const allPosts = await getAllPosts();
	return allPosts.find((post) => post.slug === slug);
}
