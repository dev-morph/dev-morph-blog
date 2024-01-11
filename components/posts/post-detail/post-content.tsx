import Image from 'next/image';
import PostHeader from './post-header';
import ReactMarkDown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import classes from './post-content.module.scss';

type PostType = {
	slug: string;
	title: string;
	image: string;
	excerpt: string;
	date: string;
	content: string;
};

type PostContentProps = {
	post: PostType;
};

export default function PostContent({ post }: PostContentProps) {
	const imagePath = `/images/posts/${post.slug}/${post.image}`;

	const customRenderers: Components = {
		p(paragraph) {
			const { node } = paragraph;
			const firstChild = node?.children[0];

			// Check if firstChild is an element and has a tagName property
			if (
				firstChild &&
				typeof firstChild === 'object' &&
				'tagName' in firstChild &&
				firstChild.tagName === 'img'
			) {
				const image = firstChild;
				return (
					<div className={classes.image}>
						<Image
							src={`/images/posts/${post.slug}/${image.properties.src}`}
							alt={image.properties.alt as string}
							width={500}
							height={500}
						/>
					</div>
				);
			}
			return <p>{paragraph.children}</p>;
		},

		code(code) {
			const { className, children, node, ...rest } = code;
			const lang = className?.split('-')[1];

			const codeString =
				typeof children === 'string'
					? children
					: Array.isArray(children)
					? children.join('\n')
					: '';

			return (
				<SyntaxHighlighter style={vscDarkPlus} language={lang}>
					{codeString}
				</SyntaxHighlighter>
			);
		},
	};

	return (
		<article className={classes.content}>
			<PostHeader title={post.title} date={post.date} image={imagePath} />
			<div>
				<Image
					src={imagePath}
					alt={post.title}
					width={500}
					height={500}
					style={{
						width: '100%',
						height: 'auto',
					}}
				/>
			</div>
			<ReactMarkDown components={customRenderers}>
				{post.content}
			</ReactMarkDown>
		</article>
	);
}
