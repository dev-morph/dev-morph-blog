import classes from '@morphlib/sass/Top.module.scss';

export default function Top04({
	children,
	alignment,
	styled,
}: {
	children: string;
	alignment?: 'center' | 'left' | 'right';
	styled?: { [key: string]: string };
}) {
	return (
		<h1
			style={{ textAlign: alignment, ...styled }}
			className={classes.top04}
		>
			{children}
		</h1>
	);
}