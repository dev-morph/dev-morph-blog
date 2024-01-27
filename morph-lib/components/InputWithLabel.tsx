import { PropsWithChildren } from 'react';
import classes from '@morphlib/sass/InputWithLabel.module.scss';

type InputWithLabelProps = PropsWithChildren<{
	labelText: string;
	htmlFor: string;
	type?: 'text' | 'password';
}>;

export default function InputWithLabel(props: InputWithLabelProps) {
	const { labelText, htmlFor, type = 'text', ...rest } = props;
	return (
		<div className={classes.wrapper}>
			<input
				type={type}
				id={htmlFor}
				className={classes.input}
				name={htmlFor}
				placeholder=" "
			/>
			<label htmlFor={htmlFor} className={classes.label}>
				{labelText}
			</label>
		</div>
	);
}
