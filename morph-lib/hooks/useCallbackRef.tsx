/**
 * re-render(or re-execute)되는 것을 막기 위해 callback을 ref로 만드는 커스텀 훅
 * 1. when passing props
 * 2. when passing dependency of effects
 */

import { useEffect, useMemo, useRef } from 'react';

function useCallbackRef<T extends (...args: any[]) => any>(
	callback: T | undefined
): T {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	});

	return useMemo(
		() => ((...args) => callbackRef.current?.(...args)) as T,
		[]
	);
}

export { useCallbackRef };
