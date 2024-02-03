import Image from 'next/image';
import Text from './Text';
import CloseIcon from '@/components/ui/icons/close-icon';
import CircleIcon from '@/components/ui/icons/circle-icon';
import CheckIcon from '@/components/ui/icons/check-icon';
import classes from '@morphlib/sass/FileThumbnails.module.scss';
import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

type FileThumbnailsProps = {
	files: File[];
	deleteFileHandler?: Function;
	addFileHandler?: MouseEventHandler<HTMLDivElement>;
	onDrop?: Function;
	thumbnail?: File;
	setThumbnail?: Dispatch<SetStateAction<File | undefined>>;
};

export default function FileThumbnails({
	files,
	deleteFileHandler,
	addFileHandler,
	onDrop,
	thumbnail,
	setThumbnail,
}: FileThumbnailsProps) {
	function clickDeleteBtn(fileName: string) {
		deleteFileHandler && deleteFileHandler(fileName);
	}

	function clickThumbnail(file: File) {
		setThumbnail &&
			setThumbnail((prev) => {
				console.log('prev is ', prev);
				return file;
			});
	}

	return (
		<div
			className={classes.image__wrapper}
			onDragOver={(e) => {
				e.preventDefault();
				e.stopPropagation();
			}}
			onDragEnter={(e) => {
				e.preventDefault();
				e.stopPropagation();
			}}
			onDrop={(e) => {
				e.preventDefault();
				e.stopPropagation();
				onDrop && onDrop(e);
			}}
		>
			{files.map((file) => (
				<div className={classes.image} key={file.name}>
					<Image
						src={URL.createObjectURL(file)}
						width={90}
						height={90}
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
					{setThumbnail && (
						<div
							className={`${classes.thumbnail} ${
								thumbnail?.name === file.name && classes.checked
							}`}
							onClick={() => clickThumbnail(file)}
						>
							{thumbnail?.name === file.name ? (
								<CheckIcon size="0.8rem" />
							) : (
								<CircleIcon size="0.8rem" />
							)}

							<Text>대표</Text>
						</div>
					)}
				</div>
			))}
			<div className={classes.add__btn} onClick={addFileHandler}>
				+
			</div>
		</div>
	);
}
