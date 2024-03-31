import { useEffect, useState } from 'react';

type UseOutsideClickProps = {
	el: React.RefObject<HTMLDivElement>;
	initialState: boolean;
};

export default function UseOutsideClick(
	elRef: React.RefObject<HTMLDivElement>,
	initialState: boolean
) {
	const [isActive, setIsActive] = useState(initialState);

	useEffect(() => {
		const pageClickEvent = (e: any) => {
			if (elRef.current !== null && !elRef.current.contains(e.target)) {
				setIsActive(!isActive);
			}
		};

		if (isActive) {
			window.addEventListener('click', pageClickEvent);
		}

		return () => window.removeEventListener('click', pageClickEvent);
	}, [isActive, elRef]);

	return { isActive, setIsActive };
}
