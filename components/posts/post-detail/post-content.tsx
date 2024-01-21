import Image from 'next/image';
import PostHeader from './post-header';
import FadeIn from '@/components/ui/fade-in';
import Toc from '@/components/ui/toc';

import CustomMarkdown from '@/components/common/custom-markdown';

import classes from './post-content.module.scss';
import { PostType } from '@/types/post_types';

type PostContentProps = {
	post: PostType;
};

export default function PostContent({ post }: PostContentProps) {
	const imagePath = `/images/posts/${post.slug}/${post.image}`;

	return (
		<main>
			<FadeIn from="left">
				<article>
					<PostHeader
						title={post.title}
						date={post.date}
						image={imagePath}
					/>
					<div className={classes.thumb__nail}>
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
					<div id="content__entry__point">
						<CustomMarkdown components={post} />
					</div>
				</article>
			</FadeIn>
			<Toc title={post.title}></Toc>
		</main>
	);
}
