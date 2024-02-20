import Link from 'next/link';
import Image from 'next/image';
import Text from '@morphlib/components/Text';
import classes from '@morphlib/sass/Card.module.scss';
import dayjs from 'dayjs';

type ImgProps = {
	imagePath: string;
	title: string;
	width: number;
	height: number;
	hoverText?: string;
};

function Img({ imagePath, title, width, height, hoverText }: ImgProps) {
	return (
		<div className={classes.image}>
			<div className={classes.hover__detail}>
				<div className={classes.excerpt}>
					<Text>{hoverText}</Text>
				</div>
			</div>
			<Image
				src={imagePath}
				alt={title}
				width={width}
				height={height}
				priority={true}
				sizes="100vw"
				style={{
					width: '100%',
					height: 'auto',
				}}
			/>
		</div>
	);
}

type DescriptionProps = {
	title: string;
	creatTime: string;
};

function Description({ title, creatTime }: DescriptionProps) {
	return (
		<div className={classes.description}>
			<Text textAlign="left" size="15px" fontWeight="bolder">
				{title}
			</Text>
			<Text textAlign="right" size="14px">
				<time>{dayjs(creatTime).format('YYYY-MM-DD HH:mm:ss')}</time>
			</Text>
		</div>
	);
}

type CardProps = {
	href: string;
	image: React.ReactNode;
	description?: React.ReactNode;
};

function Card({ href, image, description }: CardProps) {
	return (
		<article className={classes.card}>
			<Link href={href}>
				{image}
				{description}
			</Link>
		</article>
	);
}

Card.Image = Img;
Card.Description = Description;

export default Card;
