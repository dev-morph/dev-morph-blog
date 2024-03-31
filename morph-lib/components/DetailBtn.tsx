import DetailIcon from '@/components/ui/icons/detail-icon';
import useOutsideClick from '../hooks/useOutsideClick';
import { MouseEventHandler, useCallback, useRef } from 'react';
import classes from '../sass/DetailBtn.module.scss';

type DetailCommandType = {
	label: string;
	clickHandler: MouseEventHandler<HTMLLIElement>;
};

type DetailBtnProps = {
	className?: string;
	commandItems?: DetailCommandType[];
};

export default function DetailBtn({ className, commandItems }: DetailBtnProps) {
	const detailBtnRef = useRef<HTMLDivElement>(null);
	const { isActive, setIsActive } = useOutsideClick(detailBtnRef, false);

	const clickDetailBtn = useCallback(() => {
		setIsActive((prev) => !prev);
	}, [setIsActive]);

	return (
		<summary className={classes.detail__btn__wrapper}>
			<DetailIcon
				ref={detailBtnRef}
				className={className}
				clickHandler={clickDetailBtn}
			/>
			{isActive && (
				<div className={classes.detail}>
					<ul className={classes.detail__context__wrapper}>
						{commandItems?.map((command, idx) => (
							<li key={idx} onClick={command.clickHandler}>
								{command.label}
							</li>
						))}
					</ul>
				</div>
			)}
		</summary>
	);
}
