import PostsGrid from './posts-grid';
import Spacing from '@morphlib/components/Spacing';
import Chips from '@/morph-lib/components/Chips';

type Post = {
	title: string;
	image: string;
	excerpt: string;
	date: string;
	slug: string;
};
type AllPostsProps = {
	posts: Post[];
};

export default function AllPosts({ posts }: AllPostsProps) {
	return (
		<>
			{/* <Chips>
				<Chips.Item>All</Chips.Item>
				<Chips.Item>React</Chips.Item>
				<Chips.Item>Next</Chips.Item>
				<Chips.Item>Springboot</Chips.Item>
				<Chips.Item>AWS</Chips.Item>
			</Chips> */}
			{/* <Spacing size="var(--size-8)" /> */}
			<PostsGrid posts={posts} />
		</>
	);
}
