import classes from './post-header.module.scss';
import Chips from '@/morph-lib/components/Chips';
import Top01 from '@/morph-lib/components/Top/Top01';
import Spacing from '@/morph-lib/components/Spacing';

type PostHeaderProps = {
	title: string;
	image: string;
	date: string;
};

export default function PostHeader({ title, date }: PostHeaderProps) {
	return (
		<>
			<Top01>{title}</Top01>
			<Spacing size="var(--size-2)" />
			<Chips>
				<Chips.Item>{date}</Chips.Item>
			</Chips>
			<Spacing size="var(--size-2)" />
		</>
	);
}
