import { useCallback, useRef, useState } from 'react';

export default function useInput(defaultValue?: string) {
	// const [value, setValue] = useState(defaultValue);
	const value = useRef(defaultValue);

	const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		// const normalizedValue = (target.value as string).normalize('NFC');
		// console.log('inside hooks ', normalizedValue);

		// setValue(() => target.value);
		value.current = target.value;
	}, []);

	const reset = useCallback(() => {
		// setValue(defaultValue || '');
		value.current = defaultValue || '';
	}, [defaultValue]);
	return { value, onChange, reset };
	// return { value, onChange, reset };
}
