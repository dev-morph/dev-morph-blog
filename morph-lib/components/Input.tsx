import { PropsWithChildren, CSSProperties } from 'react';
import classes from '@morphlib/sass/Input.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import Text from './Text';
import useInput from '../hooks/useInput';

type InputWithLabelProps = PropsWithChildren<{
	htmlFor?: string;
	type?: 'text' | 'password';
	placeholder?: string;
	register?: UseFormRegisterReturn;
	errorMsg?: string;
	border?: string;
	style?: CSSProperties;
	value?: string;
}>;

export default function Input(props: InputWithLabelProps) {
	const { value: inputValue, onChange } = useInput(props.value);

	const {
		htmlFor,
		type = 'text',
		placeholder,
		register,
		errorMsg,
		border,
		style,
	} = props;

	const id = htmlFor + uuidv4();
	return (
		<>
			<input
				key="special"
				autoComplete="off"
				type={type}
				id={htmlFor}
				className={classes.input}
				name={htmlFor}
				placeholder={placeholder}
				style={{ border: border, ...style }}
				value={inputValue}
				onChange={onChange}
				{...register}
			/>
			{errorMsg && <Text className="error__msg">{errorMsg}</Text>}
		</>
	);
}
