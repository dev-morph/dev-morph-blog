import { PropsWithChildren } from 'react';
import classes from '@morphlib/sass/Button.module.scss';

type ButtonProps = PropsWithChildren<{
	type?: 'primary' | 'dark' | 'text';
	style?: 'fill';
	display?: 'inline' | 'block' | 'full';
	btnColor?: string;

	onClick?: React.MouseEventHandler<HTMLElement>;
	disabled?: boolean;
	fontSize?: string;
}>;

export default function Button(props: ButtonProps) {
	const {
		type = 'primary',
		style = 'fill',
		display = 'inline',
		btnColor,
		disabled,
		children,
		fontSize,
		...rest
	} = props;

	return (
		<button
			{...rest}
			className={`${classes.button} ${classes[type]}`}
			style={{ backgroundColor: btnColor }}
			disabled={disabled}
		>
			<span className={classes.btn__text} style={{ fontSize: fontSize }}>
				{children}
			</span>
		</button>
	);
}
