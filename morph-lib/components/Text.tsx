import { CSSProperties } from 'react';
import classes from '@morphlib/sass/Text.module.scss';

export const FontWeight = {
	Regular: 'regular',
	Semibold: 'semibold',
	Bold: 'bold',
	Bolder: 'bolder',
};

type FontWeightValue = (typeof FontWeight)[keyof typeof FontWeight];

type TextProps = {
	children: React.ReactNode;
	size?: string;
	color?: string;
	fontWeight?: FontWeightValue;
	textAlign?: CSSProperties['textAlign'];
	styled?: { [key: string]: string };
};

export default function Text({
	children,
	size,
	color,
	fontWeight,
	textAlign,
	styled,
}: TextProps) {
	return (
		<span
			className={fontWeight && classes[fontWeight]}
			style={{ textAlign: textAlign, color: color, ...styled }}
		>
			{children}
		</span>
	);
}
