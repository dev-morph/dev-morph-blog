import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classes from '@morphlib/sass/Modal.module.scss';
import Border from '../components/Border';
import Button from '../components/Button';
import CloseIcon from '@/components/ui/icons/close-icon';

type ModalPropsType = {
	title?: React.ReactNode;
	body?: React.ReactNode;
	buttons?: React.ReactNode;
};

type UseModalProps = {
	confirmCallback?: Function;
	cancleCallback?: Function;
};

export default function useModal({
	cancleCallback,
	confirmCallback,
}: UseModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	function openDialog() {
		setIsOpen(true);
	}

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

	function closeDialog() {
		setIsOpen(false);
	}

	function successHandler(e: React.MouseEvent<HTMLElement>) {
		e.preventDefault();
		e.stopPropagation();
		if (confirmCallback) {
			confirmCallback();
		}
	}
	function failHandler(e: React.MouseEvent<HTMLElement>) {
		e.preventDefault();
		e.stopPropagation();
		if (cancleCallback) {
			cancleCallback();
		}
	}
	CloseIcon;
	// function Modal({ children }: { children?: React.ReactNode }) {
	function Modal({ title, body, buttons }: ModalPropsType) {
		const buttonComponent = buttons ? (
			buttons
		) : (
			<>
				<Button width="100px" onClick={successHandler}>
					확인
				</Button>
				<Button
					width="100px"
					onClick={failHandler}
					btnColor="var(--button-bgColor-muted)"
					color="black"
					btnStyle={{
						border: '1px solid var(--border-default-color)',
					}}
				>
					취소
				</Button>
			</>
		);

		if (isOpen) {
			return createPortal(
				<div
					className={classes.modal__backdrop}
					onClick={modalClickHandler}
				>
					<div className={classes.modal} ref={modalRef}>
						<div className={classes.modal__header}>
							{title}
							<div className={classes.close__icon}>
								<CloseIcon size="20" />
							</div>
						</div>
						<Border withOutSpacing={true} borderWidth="0.75px" />
						<div className={classes.modal__body}>{body}</div>
						<Border withOutSpacing={true} borderWidth="0.75px" />
						<div className={classes.modal__btns}>
							{buttonComponent}
							{/* {buttons}
							<Button width="100px" onClick={successHandler}>
								확인
							</Button>
							<Button
								width="100px"
								onClick={failHandler}
								btnColor="var(--button-bgColor-muted)"
								color="black"
								btnStyle={{
									border: '1px solid var(--border-default-color)',
								}}
							>
								취소
							</Button> */}
						</div>
					</div>
				</div>,
				document.querySelector('#dialogs') as HTMLElement
			);
		}
	}

	return { Modal, openDialog, closeDialog };
}
