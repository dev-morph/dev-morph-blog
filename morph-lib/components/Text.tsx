import { CSSProperties, MouseEventHandler } from 'react';
import classes from '@morphlib/sass/Text.module.scss';

const FontWeight = {
	Regular: 'regular',
	Semibold: 'semibold',
	Bold: 'bold',
	Bolder: 'bolder',
};

type FontWeightValue = (typeof FontWeight)[keyof typeof FontWeight];

type TextProps = {
	children: React.ReactNode;
	className?: string;
	size?: string;
	color?: string;
	fontWeight?: FontWeightValue;
	textAlign?: CSSProperties['textAlign'];
	styled?: CSSProperties;
	onClick?: MouseEventHandler<HTMLElement>;
};

export default function Text({
	children,
	className,
	size,
	color,
	fontWeight,
	textAlign,
	styled,
	onClick,
}: TextProps) {
	return (
		<span
			className={`${fontWeight && classes[fontWeight]} ${
				className && className
			}`}
			style={{
				textAlign: textAlign,
				color: color,
				fontSize: size,
				display: 'block',
				...styled,
			}}
			onClick={onClick}
		>
			{children}
		</span>
	);
}
