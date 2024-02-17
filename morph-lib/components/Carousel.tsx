'use client';

import Image from 'next/image';
import { MouseEventHandler, PropsWithChildren, useState } from 'react';
import classes from '@morphlib/sass/Carousel.module.scss';
import { createContext, useContext } from 'react';

type CarouselContextType = {
	activeIndex: number;
	updateIndex: Function;
};
const CarouselContext = createContext<CarouselContextType>(null as any);

type CarouselItemProps = {
	imagePath: string;
	imgAlt: string;
	title: string;
	idx: number;
	onClick: MouseEventHandler<HTMLDivElement>;
};

type CarouselProps = PropsWithChildren<{
	items: any[];
}>;

function CarouselItem({
	imagePath,
	imgAlt,
	title,
	idx,
	onClick,
}: CarouselItemProps) {
	const carouselContext = useContext(CarouselContext);
	return (
		<div
			className={`${classes.carousel__item} ${
				idx === carouselContext.activeIndex ? classes.active : ''
			}`}
			onClick={(e) => {
				if (carouselContext.activeIndex === idx) {
					onClick(e);
				} else {
					carouselContext.updateIndex(idx);
				}
			}}
		>
			<Image src={imagePath} width={250} height={250} alt={imgAlt} />
			<span className={classes.title}>{title}</span>
		</div>
	);
}

function Carousel({ children, items }: CarouselProps) {
	const [activeIndex, setActiveIndex] = useState(0);

	function updateIndex(index: number) {
		if (index >= items.length) {
			setActiveIndex(0);
		} else {
			setActiveIndex(index);
		}
	}

	return (
		<CarouselContext.Provider value={{ activeIndex, updateIndex }}>
			<div className={classes.carousel}>
				<div className={classes.inner}>{items}</div>
			</div>
		</CarouselContext.Provider>
	);
}

Carousel.Item = CarouselItem;

export default Carousel;
