import Image from 'next/image';

import ReactMarkDown, { Components } from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import classes from './custom-markdown.module.scss';
import { PostType } from '@/types/post_types';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('jsx', jsx);

export default function CustomMarkdown({
	components,
}: {
	components: PostType;
}) {
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
					<p className={classes.image}>
						<Image
							src={`/images/posts/${components.slug}/${image.properties.src}`}
							alt={image.properties.alt as string}
							width={500}
							height={350}
							style={{
								width: '100%',
								height: 'auto',
							}}
						/>
						<span className={classes.img__description}>
							{image.properties.alt}
						</span>
					</p>
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
		<div id="content__entry__point">
			<ReactMarkDown
				components={customRenderers}
				className={classes.markdown__wrapper}
			>
				{components.content}
			</ReactMarkDown>
		</div>
	);
}
