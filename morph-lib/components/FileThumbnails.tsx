import Image from 'next/image';
import { ImageThumnbnailType } from '@/types/FileThumbnail_types';
import classes from '@morphlib/sass/FileThumbnails.module.scss';
import CloseIcon from '@/components/ui/icons/close-icon';

type FileThumbnailsProps = {
	images: ImageThumnbnailType[];
	deleteFileHandler?: Function;
};

export default function FileThumbnails({
	images,
	deleteFileHandler,
}: FileThumbnailsProps) {
	function clickDeleteBtn(fileName: string) {
		deleteFileHandler && deleteFileHandler(fileName);
	}

	return (
		<div className={classes.image__wrapper}>
			{images.map((image) => (
				<div className={classes.image} key={image.url}>
					<Image
						src={image.url}
						width={80}
						height={80}
						sizes="80px"
						alt={image.name}
						placeholder="blur"
						blurDataURL={image.url}
					/>
					<div
						className={classes.delete__btn}
						onClick={() => clickDeleteBtn(image.name)}
					>
						<CloseIcon size="0.8rem" />
					</div>

					{/* <div className={classes.delete__btn}>x</div> */}
				</div>
			))}
		</div>
	);
}
