import { PropsWithChildren, CSSProperties } from 'react';
import classes from '@morphlib/sass/Input.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';
import Text from './Text';

type InputWithLabelProps = PropsWithChildren<{
	htmlFor?: string;
	type?: 'text' | 'password';
	placeholder?: string;
	register?: UseFormRegisterReturn;
	errorMsg?: string;
	border?: string;
	style?: CSSProperties;
}>;

export default function Input(props: InputWithLabelProps) {
	const {
		htmlFor,
		type = 'text',
		placeholder,
		register,
		errorMsg,
		border,
		style,
	} = props;
	return (
		<>
			<input
				key="special"
				type={type}
				id={htmlFor}
				className={classes.input}
				name={htmlFor}
				placeholder={placeholder}
				style={{ border: border, ...style }}
				{...register}
			/>
			{errorMsg && <Text className="error__msg">{errorMsg}</Text>}
		</>
	);
}
