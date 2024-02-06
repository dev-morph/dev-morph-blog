import classes from './post-header.module.scss';
import Chips from '@morphlib/components/Chips';
import Top02 from '@morphlib/components/Top/Top02';
import Spacing from '@morphlib/components/Spacing';
import dayjs from 'dayjs';

type PostHeaderProps = {
	title: string;
	date: string;
};

export default function PostHeader({ title, date }: PostHeaderProps) {
	console.log('title is ', title);
	return (
		<>
			<Top02>{title}</Top02>
			<Spacing size="var(--size-2)" />
			{/* <Chips>
				<Chips.Item>{dayjs(date).format('YYYY-MM-DD')}</Chips.Item>
			</Chips> */}
			<Spacing size="var(--size-2)" />
		</>
	);
}
