import { PropsWithChildren, InputHTMLAttributes } from 'react';
import classes from '@morphlib/sass/InputWithLabel.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';
import Text from './Text';

type InputWithLabelProps = PropsWithChildren<{
	htmlFor?: string;
	type?: 'text' | 'password';
	placeholder?: string;
	register?: UseFormRegisterReturn;
	errorMsg?: string;
}>;

export default function Input(props: InputWithLabelProps) {
	const {
		htmlFor,
		type = 'text',
		placeholder,
		register,
		errorMsg,
		...rest
	} = props;
	return (
		<>
			<input
				type={type}
				id={htmlFor}
				className={classes.input}
				name={htmlFor}
				placeholder={placeholder}
				{...register}
			/>
			{errorMsg && <Text className="error__msg">{errorMsg}</Text>}
		</>
	);
}
