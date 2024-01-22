import classes from './post-header.module.scss';
import Chips from '@/morph-lib/components/Chips';
import Top02 from '@/morph-lib/components/Top/Top02';
import Spacing from '@/morph-lib/components/Spacing';

type PostHeaderProps = {
	title: string;
	image: string;
	date: string;
};

export default function PostHeader({ title, date }: PostHeaderProps) {
	return (
		<>
			<Top02>{title}</Top02>
			<Spacing size="var(--size-2)" />
			<Chips>
				<Chips.Item>{date}</Chips.Item>
			</Chips>
			<Spacing size="var(--size-2)" />
		</>
	);
}
