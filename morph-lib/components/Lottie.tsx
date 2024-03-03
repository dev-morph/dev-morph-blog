'use client';

import lottie, { AnimationItem } from 'lottie-web';
import React, { memo, useRef } from 'react';
import { MutableRefObject, useEffect } from 'react';
import classes from '@morphlib/sass/Lottie.module.scss';

type LottieProps = {
	src: string;
	loop?: boolean;
	autoplay?: boolean;
	controller?: MutableRefObject<AnimationItem | null>;
	className?: string;
	style?: React.CSSProperties;
};

const Lottie = memo(
	({
		src,
		loop = true,
		autoplay = true,
		controller,
		className,
		style,
	}: LottieProps) => {
		const container = useRef<HTMLDivElement | null>(null);
		const player = useRef<AnimationItem | null>(null);

		useEffect(() => {
			if (container.current === null) return;

			player.current = lottie.loadAnimation({
				container: container.current,
				loop,
				autoplay,
				renderer: 'svg',
				path: src,
				rendererSettings: {
					progressiveLoad: true,
					hideOnTransparent: true,
				},
			});

			if (controller !== undefined && controller.current == null) {
				controller.current = player.current;
			}

			return () => {
				player.current?.destroy();
			};
		}, [src, loop, autoplay, controller]);

		return (
			<div
				className={className && classes[className]}
				style={{ ...style }}
				ref={container}
			/>
			// <div
			// 	style={{
			// 		width: '100%',
			// 		height: '150px',
			// 		display: 'flex',
			// 		justifyContent: 'center',
			// 	}}
			// >
			// </div>
		);
	},
	(prev, next) => {
		return (
			prev.src === next.src &&
			prev.loop === next.loop &&
			prev.autoplay === next.autoplay
		);
	}
);

Lottie.displayName = 'Lottie';
export default Lottie;
