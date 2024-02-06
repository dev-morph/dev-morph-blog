import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import CustomMarkdown from '../common/custom-markdown';
import { StaticPostType } from '@/types/post_types';

export default async function AboutMe() {
	const filePath = path.join(process.cwd(), 'docs', 'about-me.md');
	const fileContent = await fs.readFile(filePath, 'utf8');
	const { data, content } = matter(fileContent);

	const aboutMeData: StaticPostType = {
		title: data.title,
		excerpt: data.excerpt,
		date: data.date,
		content,
	};

	return <CustomMarkdown components={aboutMeData} />;
}
