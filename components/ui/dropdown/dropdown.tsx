'use client';

import { createContext, useContext, useState } from 'react';
const ToggleContext = createContext({});

export default function Dropdown(props: React.PropsWithChildren) {
	const [isOpen, setIsOpen] = useState(false);

	const providerValue = { isOpen, setIsOpen };

	return (
		<ToggleContext.Provider value={providerValue}>
			{props.children}
		</ToggleContext.Provider>
	);
}
