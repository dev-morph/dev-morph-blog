import classes from '@morphlib/sass/Modal.module.scss';
import { Dispatch, RefObject, SetStateAction } from 'react';

export default function ModalBackground({
	modalRef,
	setIsOpen,
}: {
	modalRef: RefObject<HTMLDivElement>;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
	function modalClickHandler(e: React.MouseEvent<HTMLElement>) {
		const target = e.target as HTMLElement;
		const parent = target.parentElement;
		const closeBtnClass = `${classes.close__icon}`;

		//closeBtn 이거나, Modal 내부가 아니면 작동
		if (
			target.classList.contains(closeBtnClass) ||
			parent?.classList.contains(closeBtnClass) ||
			!modalRef.current?.contains(target)
		) {
			setIsOpen(false);
		} else {
			return;
		}
	}

	return (
		<div
			className={classes.modal__backdrop}
			onClick={modalClickHandler}
		></div>
	);
}
