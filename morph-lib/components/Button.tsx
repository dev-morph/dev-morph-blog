import { ButtonHTMLAttributes, MouseEventHandler, PropsWithChildren, useRef } from 'react';
import classes from '@morphlib/sass/Button.module.scss';
import { recordTraceEvents } from 'next/dist/trace';

type ButtonProps = PropsWithChildren<{
	type?: 'primary' | 'dark' | 'text';
	btnType?: 'button' | 'submit' | 'reset';
	style?: 'fill' | 'outline';
	display?: 'inline' | 'block' | 'full';
	btnColor?: string;

	onClick?: React.MouseEventHandler<HTMLElement>;
	disabled?: boolean;
	fontSize?: string;
}>;

export default function Button(props: ButtonProps) {
	const btnRef = useRef<HTMLButtonElement>();
	const {
		type = 'primary',
		style = 'fill',
		display = 'inline',
		btnType = 'submit',
		btnColor,
		disabled,
		children,
		fontSize,
		onClick,
		...rest
	} = props;

	function addRippleEffect(e: React.MouseEvent) {
		const ripple = document.createElement('span')
		ripple.classList.add(`${classes.ripple}`);
		const rect = btnRef.current?.getBoundingClientRect() as DOMRect;
		const x = e.clientX - rect.left + "px";
		const y = e.clientY - rect.top + "px";

		ripple.style.left = x;
		ripple.style.top = y;

		btnRef.current?.append(ripple);

		setTimeout(() => {
			btnRef.current?.removeChild(ripple);
		}, 500)
	}


	return (
		<button
			{...rest}
			className={`${classes.button} ${classes[type]} ${classes[style]}`}
			type={btnType}
			style={{ backgroundColor: btnColor }}
			disabled={disabled}
			ref={btnRef}
			onClick={(e) => {
				addRippleEffect(e);
				onClick && onClick(e)
			}}
		>
			<span className={classes.btn__text} style={{ fontSize: fontSize }}>
				{children}
			</span>
		</button>
	);
}
