import Image from 'next/image';
import Text from './Text';
import CloseIcon from '@/components/ui/icons/close-icon';
import classes from '@morphlib/sass/FileThumbnails.module.scss';
import { MouseEventHandler } from 'react';

type FileThumbnailsProps = {
	files: File[];
	deleteFileHandler?: Function;
	addFileHandler?: MouseEventHandler<HTMLDivElement>;
};

export default function FileThumbnails({
	files,
	deleteFileHandler,
	addFileHandler,
}: FileThumbnailsProps) {
	function clickDeleteBtn(fileName: string) {
		deleteFileHandler && deleteFileHandler(fileName);
	}

	return (
		<div className={classes.image__wrapper}>
			{files.map((file) => (
				<div className={classes.image} key={file.name}>
					<Image
						src={URL.createObjectURL(file)}
						width={80}
						height={80}
						sizes="80px"
						alt={file.name}
						placeholder="blur"
						blurDataURL={URL.createObjectURL(file)}
					/>
					<div
						className={classes.delete__btn}
						onClick={() => clickDeleteBtn(file.name)}
					>
						<CloseIcon size="0.8rem" />
					</div>
				</div>
			))}
			<div className={classes.add__btn} onClick={addFileHandler}>
				+
			</div>
		</div>
	);
}
