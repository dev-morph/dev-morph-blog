// import { promises as fs } from 'fs';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import CustomMarkdown from '../common/custom-markdown';
import { PostType } from '@/types/post_types';
import classes from './about-me.module.scss';

export default async function AboutMe() {
	const filePath = path.join(process.cwd(), 'docs', 'about-me.md');
	const fileContent = await fs.readFile(filePath, 'utf8');
	const { data, content } = matter(fileContent);

	const aboutMeData: PostType = {
		title: data.title,
		excerpt: data.excerpt,
		date: data.date,
		content,
	};

	return (
		<div className={classes.content__wrapper}>
			<article className={classes.content}>
				<CustomMarkdown components={aboutMeData}></CustomMarkdown>
			</article>
		</div>
	);
}
