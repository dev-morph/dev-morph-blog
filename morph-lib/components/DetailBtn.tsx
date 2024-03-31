import DetailIcon from '@/components/ui/icons/detail-icon';
import UseOutsideClick from '../hooks/useOutsideClick';
import { useCallback, useRef } from 'react';
import classes from '../sass/DetailBtn.module.scss';

type DetailBtnProps = {
	className?: string;
};

export default function DetailBtn({ className }: DetailBtnProps) {
	const testRef = useRef<HTMLDivElement>(null);
	const { isActive, setIsActive } = UseOutsideClick(testRef, false);

	const clickDetailBtn = useCallback(() => {
		setIsActive((prev) => !prev);
	}, [setIsActive]);
	return (
		<summary className={classes.detail__btn__wrapper}>
			<DetailIcon
				ref={testRef}
				className={className}
				clickHandler={clickDetailBtn}
			/>
			{isActive && (
				<div className={classes.detail}>
					<ul className={classes.detail__context__wrapper}>
						<li>삭제</li>
						<li>수정</li>
					</ul>
				</div>
			)}
		</summary>
	);
}
