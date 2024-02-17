import Image from 'next/image';
import { MouseEventHandler } from 'react';

type CarouselItemProps = {
	imagePath: string;
	imgAlt: string;
	title: string;
	className: string;
	// onClick: MouseEventHandler<HTMLDivElement>;
};

export default function CarouselItem({
	imagePath,
	imgAlt,
	title,
	className,
}: // onClick,
CarouselItemProps) {
	return (
		<div
		// className={`${classes.carousel__item} ${className}`}
		// onClick={onClick}
		>
			<Image src={imagePath} width={250} height={250} alt={imgAlt} />
			<span>{title}</span>
		</div>
	);
}
