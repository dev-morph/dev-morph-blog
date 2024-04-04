import { UseFormRegisterReturn } from 'react-hook-form';
import Text from './Text';

type TextareaProps = {
	cols?: number;
	rows?: number;
	errorMsg?: string;
	className?: string;
	placeholder?: string;
	value?: string;
	register?: UseFormRegisterReturn;
};

export default function Textarea({
	cols = 30,
	rows = 28,
	errorMsg,
	className,
	placeholder,
	value,
	register,
}: TextareaProps) {
	return (
		<>
			<textarea
				className={className}
				cols={cols}
				rows={rows}
				placeholder={placeholder}
				value={value}
				style={{ width: '100%', padding: '0.5rem' }}
				{...register}
			/>
			{errorMsg && <Text className="error__msg">{errorMsg}</Text>}
		</>
	);
}
