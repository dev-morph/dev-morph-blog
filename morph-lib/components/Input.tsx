import {
	PropsWithChildren,
	CSSProperties,
	ChangeEventHandler,
	forwardRef,
} from 'react';
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
	onChange?: ChangeEventHandler<HTMLInputElement>;
	autofocus?: boolean;
}>;

export default forwardRef<HTMLInputElement, InputWithLabelProps>(function Input(
	props,
	ref
) {
	const {
		htmlFor,
		type = 'text',
		placeholder,
		register,
		errorMsg,
		border,
		style,
		value,
		onChange,
		autofocus = false,
	} = props;

	const id = htmlFor + uuidv4();

	return (
		<>
			<input
				ref={ref}
				key={htmlFor}
				autoComplete="off"
				type={type}
				id={id}
				className={classes.input}
				name={htmlFor}
				placeholder={placeholder}
				style={{ border: border, ...style }}
				value={value}
				onChange={onChange}
				autoFocus={autofocus}
				{...register}
			/>
			{errorMsg && <Text className="error__msg">{errorMsg}</Text>}
		</>
	);
});
