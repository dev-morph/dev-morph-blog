import { PropsWithChildren, useEffect, useRef } from 'react';
import { useIsMount } from '../hooks/useIsMount';
import { createPortal } from 'react-dom';

type PortalProps = {
	id: string;
};

export default function Portal({
	id,
	children,
}: PropsWithChildren<PortalProps>) {
	const isMount = useIsMount();
	const ref = useRef<HTMLDivElement>();

	useEffect(
		() => () => {
			ref.current?.parentElement?.removeChild(ref.current);
		},
		[id]
	);

	if (!isMount) return null;
	let element = document.getElementById(id);

	if (!element) {
		element = document.createElement('div');
		element.id = id;

		document.body.append(element);
	}

	ref.current = element as HTMLDivElement;

	return createPortal(<>{children}</>, ref.current);
}
