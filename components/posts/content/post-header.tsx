import Top02 from '@morphlib/components/Top/Top02';
import Spacing from '@morphlib/components/Spacing';

type PostHeaderProps = {
	title: string;
	date: string;
};

export default function PostHeader({ title, date }: PostHeaderProps) {
	return (
		<>
			<Top02>{title}</Top02>
			<Spacing size="var(--size-2)" />
			<Spacing size="var(--size-2)" />
		</>
	);
}
