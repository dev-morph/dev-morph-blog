import { forwardRef } from 'react';

type DetailIconProps = {
	className?: string;
	clickHandler?: Function;
};

export default forwardRef<HTMLDivElement, DetailIconProps>(function DetailIcon(
	{ className, clickHandler },
	ref
) {
	return (
		<div
			style={
				{
					// display: 'flex',
					// alignItems: 'center',
					// position: 'relative',
				}
			}
			className={className}
			ref={ref}
			onClick={() => clickHandler && clickHandler()}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="16"
				viewBox="0 0 16 16"
				width="16"
			>
				<path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
			</svg>
		</div>
	);
});
