import { PropsWithChildren, InputHTMLAttributes } from 'react';
import classes from '@morphlib/sass/InputWithLabel.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';

type InputWithLabelProps = PropsWithChildren<{
	labelText: string;
	htmlFor: string;
	type?: 'text' | 'password';
	register?: UseFormRegisterReturn;
}>;

export default function InputWithLabel(props: InputWithLabelProps) {
	const { labelText, htmlFor, type = 'text', register, ...rest } = props;
	return (
		<div className={classes.wrapper}>
			<input
				type={type}
				id={htmlFor}
				className={classes.input}
				name={htmlFor}
				placeholder=" "
				{...register}
			/>
			<label htmlFor={htmlFor} className={classes.label}>
				{labelText}
			</label>
		</div>
	);
}
