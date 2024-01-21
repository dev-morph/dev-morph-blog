import classes from '@morphlib/sass/Top.module.scss';
import { CSSProperties } from 'react';

export default function Top04({
	children,
	textAlign,
	styled,
}: {
	children: string;
	textAlign?: CSSProperties['textAlign'];
	styled?: { [key: string]: string };
}) {
	return (
		<h1
			style={{ textAlign: textAlign, ...styled }}
			className={classes.top04}
		>
			{children}
		</h1>
	);
}
