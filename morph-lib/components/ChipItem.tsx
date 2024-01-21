import classes from '@morphlib/sass/Chips.module.scss';

type ChipProps = {
	type?: 'time' | 'text';
	children: string;
};

export default function ChipItem({ type, children }: ChipProps) {
	return (
		<div className={classes.chip}>
			{type === 'time' ? (
				<time>{children}</time>
			) : (
				<span>{children}</span>
			)}
		</div>
	);
}
