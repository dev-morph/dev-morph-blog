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

function Avatar({ imagePath, alt, size = 50 }: AvatarProps) {
	return (
		<div className={classes.avatar}>
			<Image src={imagePath} alt={alt} width={size} height={size} />
		</div>
	);
}

export default Avatar;
