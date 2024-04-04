import Image from 'next/image';
import classes from '@morphlib/sass/Avatar.module.scss';
import { MouseEvent } from 'react';

type AvatarProps = {
	imagePath: string;
	alt: string;
	size?: number;
};

function Avatar({ imagePath, alt, size = 50 }: AvatarProps) {
	return (
		<>
			<div className={classes.avatar}>
				<Image
					src={imagePath}
					alt={alt}
					width={size}
					height={size}
					style={{ width: '100%', height: 'auto' }}
				/>
			</div>
		</>
	);
}

export default Avatar;
