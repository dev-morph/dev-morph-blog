import { PropsWithChildren, createContext, useContext } from 'react';

type ModalContextProviderProps = {
	isOpen: boolean;
	onOpenChange(open: boolean): void;
};

const ModalContext = createContext<ModalContextProviderProps>(
	{} as ModalContextProviderProps
);

export function ModalContextProvider({
	children,
	isOpen,
	onOpenChange,
}: PropsWithChildren<ModalContextProviderProps>) {
	return (
		<ModalContext.Provider
			value={{ isOpen: isOpen, onOpenChange: onOpenChange }}
		>
			{children}
		</ModalContext.Provider>
	);
}

export const useModalContext = () => useContext(ModalContext);
