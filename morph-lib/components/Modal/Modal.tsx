import { useControllableState } from '@/morph-lib/hooks/useControllableState';
import { PropsWithChildren, forwardRef, useEffect, useRef } from 'react';
import { ModalContextProvider, useModalContext } from './ModalContext';
import Portal from '../Portal';
import classes from '@morphlib/sass/Modal.module.scss';

type ModalProps = {
	isOpen?: boolean;
	defaultIsOpen?: boolean;
	onOpenChange?(open: boolean): void;
};

function Modal({
	children,
	isOpen: isOpenProp,
	defaultIsOpen,
	onOpenChange,
}: PropsWithChildren<ModalProps>) {
	const [isOpen = false, setIsOpen] = useControllableState({
		prop: isOpenProp,
		defaultProp: defaultIsOpen,
		onChange: onOpenChange,
	});

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [isOpen]);

	return (
		<ModalContextProvider isOpen={isOpen} onOpenChange={setIsOpen}>
			{children}
		</ModalContextProvider>
	);
}

type ModalTriggerProps = {
	children: ({ isOpen }: { isOpen: boolean }) => React.ReactNode;
};

function ModalTrigger({ children }: ModalTriggerProps) {
	const { isOpen, onOpenChange } = useModalContext();

	return (
		<div
			onClick={() => onOpenChange(!isOpen)}
			style={{ cursor: 'pointer' }}
		>
			{children({ isOpen })}
		</div>
	);
}

type ModalOverlayProps = {
	children: React.ReactNode;
};

const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>(
	function ModalOverlay({ children }, ref) {
		return (
			<div className={classes.dialog} ref={ref}>
				{children}
			</div>
		);
	}
);

function ModalContent({ children }: { children: React.ReactNode }) {
	const modalId = 'modal-portal';
	const modalBackdropId = 'modal-backdrop';
	const { isOpen, onOpenChange } = useModalContext();
	const overlayRef = useRef<HTMLDivElement>(null);

	function modalClickHandler(e: React.MouseEvent<HTMLElement>) {
		const target = e.target as HTMLElement;

		if (!overlayRef.current?.contains(target)) {
			onOpenChange(false);
		} else {
			return;
		}
	}

	if (!isOpen) return null;

	return (
		<>
			<Portal id={modalBackdropId}>
				<ModalBackdrop onClickBackdrop={modalClickHandler} />
			</Portal>
			<Portal id={modalId}>
				<ModalOverlay ref={overlayRef}>{children}</ModalOverlay>
			</Portal>
		</>
	);
}

type ModalBackdropProps = {
	onClickBackdrop: (e: React.MouseEvent<HTMLElement>) => void;
};

function ModalBackdrop({ onClickBackdrop }: ModalBackdropProps) {
	return (
		<div
			className={classes.modal__backdrop}
			onClick={onClickBackdrop}
		></div>
	);
}

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;

export default Modal;
