import classes from '@morphlib/sass/Chips.module.scss';

type ChipProps = {
	type?: 'time' | 'text';
	children: string;
	style?: React.CSSProperties;
	onClick?: Function;
	className?: string;
};

export default function ChipItem({
	type,
	children,
	style,
	onClick,
	className,
}: ChipProps) {
	return (
		<div
			className={`${classes.chip} ${className && classes[className]}`}
			style={style}
			onClick={() => onClick && onClick()}
		>
			{type === 'time' ? (
				<time>{children}</time>
			) : (
				<span>{children}</span>
			)}
		</div>
	);
}
