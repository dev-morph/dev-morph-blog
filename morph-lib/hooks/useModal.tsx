import { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classes from '@morphlib/sass/Modal.module.scss';
import Border from '../components/Border';
import Button from '../components/Button';
import ModalBackground from '../components/Modal/ModalBackground';
import CloseIcon from '@/components/ui/icons/close-icon';

type ModalPropsType = {
	title?: React.ReactNode;
	body?: React.ReactNode;
	buttons?: React.ReactNode;
	children?: React.ReactNode;
};

type UseModalProps = {
	confirmCallback?: Function;
	cancleCallback?: Function;
	buttonHide?: Boolean;
	titleHide?: Boolean;
};

export default function useModal({
	cancleCallback,
	confirmCallback,
	buttonHide = false,
	titleHide = false,
}: UseModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [isOpen]);
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

	const Modal = memo(function Modal({
		title,
		body,
		buttons,
		children,
	}: ModalPropsType) {
		console.log('check modal rerender');
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
			return (
				<>
					{createPortal(
						<ModalBackground
							modalRef={modalRef}
							setIsOpen={setIsOpen}
						/>,
						document.querySelector('#backdrop-root') as HTMLElement
					)}
					{createPortal(
						<div className={classes.modal} ref={modalRef}>
							<div
								className={`${classes.modal__header} ${
									titleHide && classes.hidden
								}`}
							>
								{title}
								<div
									className={classes.close__icon}
									onClick={closeDialog}
								>
									<CloseIcon size="20" />
								</div>
							</div>
							{!titleHide ? (
								<Border
									withOutSpacing={true}
									borderWidth="0.75px"
								/>
							) : (
								<></>
							)}
							<div className={classes.modal__body}>{body}</div>
							{!titleHide ? (
								<Border
									withOutSpacing={true}
									borderWidth="0.75px"
								/>
							) : (
								<></>
							)}
							<div
								className={`${classes.modal__btns} ${
									buttonHide && classes.hidden
								}`}
							>
								{buttonComponent}
							</div>
						</div>,
						document.querySelector('#overlay-root') as HTMLElement
					)}
				</>
			);
		}
	});

	return { Modal, openDialog, closeDialog };
}
