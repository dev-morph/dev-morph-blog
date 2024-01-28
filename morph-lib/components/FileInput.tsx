import React, { useState, useRef, Dispatch, SetStateAction } from 'react';
import Spacing from './Spacing';
import Button from './Button';
import Top05 from './Top/Top05';
import FileThumbnails from './FileThumbnails';

type FileInputProps = {
	files: File[];
	setFiles: Dispatch<SetStateAction<File[]>>;
};

export default function FileInput({ files, setFiles }: FileInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	function clickFileInput() {
		inputRef.current?.click();
	}

	function selectFile(
		e: React.DragEvent | React.ChangeEvent<HTMLInputElement>
	) {
		e.preventDefault();
		let selectedFiles = [] as File[];
		if (e.type === 'drop') {
			const event = e as React.DragEvent;
			selectedFiles = Array.from(event.dataTransfer.files);
		} else if (e.type === 'change') {
			const inputEl = e.target as HTMLInputElement;
			selectedFiles = inputEl.files ? Array.from(inputEl.files) : [];
		}

		setFiles((prev) => [...prev, ...selectedFiles]);
	}

	function deleteFile(fileName: string) {
		setFiles((prev) => prev.filter((file) => file.name !== fileName));
	}

	return (
		<>
			<Top05>사진첨부</Top05>
			<FileThumbnails
				files={files}
				deleteFileHandler={deleteFile}
				addFileHandler={clickFileInput}
			/>
			<Spacing size={15} />
			<Button
				onClick={clickFileInput}
				style="outline"
				fontSize="0.75rem"
				btnType="button"
			>
				사진을 추가해주세요
			</Button>
			{/* 보이지 않는 file input 추가 */}
			<input
				id="file"
				ref={inputRef}
				type="file"
				multiple
				accept="image/*"
				style={{ display: 'none' }}
				onChange={selectFile}
			/>
		</>
	);
}
