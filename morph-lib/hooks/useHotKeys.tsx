import { useEffect, useState } from 'react';

export default function useHotKeys() {
	const [isKeyPressed, setIsKeyPressed] = useState(false);
	const [shouldEscape, setShouldEscape] = useState(false);
	useEffect(() => {
		const keyDownHandler = (event: KeyboardEvent) => {
			if (event.metaKey && event.code === 'KeyK') {
				setIsKeyPressed(true);
			}
			if (event.code === 'Escape') {
				setShouldEscape(true);
			}
		};
		document.addEventListener('keydown', keyDownHandler);
		return () => document.removeEventListener('keydown', keyDownHandler);
	}, []);

	return {
		isKeyPressed,
		setIsKeyPressed,
		shouldEscape,
		setShouldEscape,
	};
}
