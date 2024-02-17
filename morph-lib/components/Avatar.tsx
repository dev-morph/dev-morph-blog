import Image from 'next/image';
import Top04 from '@morphlib/components/Top/Top04';
import Spacing from '@morphlib/components/Spacing';
import Text from './Text';
import classes from '@morphlib/sass/Avatar.module.scss';

type AvatarProps = {
	imagePath: string;
	alt: string;
	size?: number;
};

function Avatar({ imagePath, alt, size }: AvatarProps) {
	return (
		<div className={classes.avatar}>
			<Image src={imagePath} alt={alt} width={100} height={100} />
		</div>
	);
}

export function Card({ children }: { children: React.ReactNode }) {
	return (
		<div className={classes.card__wrapper}>
			{children}
			<div className={classes.description}>
				<Top04>이형태(moyang)</Top04>
				<Spacing size={10} />
				<Text size="1rem">안녕하세요.</Text>
				<Spacing size={5} />
				<Text size="1rem">
					풀스택을 지향하는 3년차 개발자 moyang입니다.
				</Text>
				<Spacing size={5} />
				<Text size="1rem">
					프로그래밍, 헬스, 달리기에 관심이 많습니다.
				</Text>
			</div>
		</div>
	);
}

Avatar.Card = Card;

export default Avatar;
