import Link from 'next/link';
import Image from 'next/image';
import Text from '@morphlib/components/Text';
import Top04 from '@morphlib/components/Top/Top04';
import classes from '@morphlib/sass/Card.module.scss';

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
					<span>{hoverText}</span>
				</div>
			</div>
			<Image
				src={imagePath}
				alt={title}
				width={width}
				height={height}
				sizes="100vw"
				style={{
					width: '100%',
					height: 'auto',
					overflow: 'hidden',
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
			<Top04 textAlign="left">{title}</Top04>
			<Text textAlign="right">
				<time>{creatTime}</time>
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
