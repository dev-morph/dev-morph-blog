import { useCallback, useRef, useState } from 'react';

export default function useInput(defaultValue: string) {
	const [value, setValue] = useState(defaultValue);
	// const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const target = e.target as HTMLInputElement;
	// 	console.log('here', target.value);
	// 	setValue(() => target.value);
	// };
	const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		setValue(() => target.value);
	}, []);
	return { value, onChange };
}
