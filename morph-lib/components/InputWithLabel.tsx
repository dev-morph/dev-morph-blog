import { PropsWithChildren } from 'react';
import classes from '@morphlib/sass/InputWithLabel.module.scss';

type InputWithLabelProps = PropsWithChildren<{
	labelText: string;
	htmlFor: string;
}>;

export default function InputWithLabel(props: InputWithLabelProps) {
	const { labelText, htmlFor, ...rest } = props;
	return (
		<div className={classes.wrapper}>
			<input
				type="text"
				id={htmlFor}
				className={classes.input}
				placeholder=" "
			/>
			<label htmlFor={htmlFor} className={classes.label}>
				{labelText}
			</label>
		</div>
	);
}
