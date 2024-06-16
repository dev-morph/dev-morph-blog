import SearchIcon from '@/components/ui/icons/search-icon';
import Border from '../Border';
import Input from '../Input';
import Spacing from '../Spacing';
import SearchResult from './SearchResult';
import classes from '@morphlib/sass/Search.module.scss';
import { useCallback, useRef, useState } from 'react';
import axios from 'axios';

export default function SearchModal({
	onCloseModal,
}: {
	onCloseModal: () => void;
}) {
	let timeout: number | NodeJS.Timeout = 0;
	const searchKeywordRef = useRef<HTMLInputElement>(null);
	const [resultList, setResultList] = useState([]);

	function inputChangeHandler() {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			if (searchKeywordRef.current?.value) {
				searchPost(searchKeywordRef.current?.value);
			}
		}, 400);
	}

	const searchPost = useCallback(async (keyword: string) => {
		if (keyword.trim().length === 0) return;
		const response = await axios.get('/api/post/elastic', {
			params: { keyword },
		});
		setResultList(response.data.data);
	}, []);

	function onItemClickHandler(id: string) {
		onCloseModal();
	}

	return (
		<>
			<div className={classes.search__input__wrapper}>
				<SearchIcon size="1rem" color="var(--fontColor-muted)" />
				<Input
					htmlFor="searchInput"
					ref={searchKeywordRef}
					type="text"
					placeholder="Search documentation"
					border="none"
					autofocus={true}
					style={{ width: '85%' }}
					onChange={inputChangeHandler}
				/>
				<kbd className={classes.kbd} onClick={onCloseModal}>
					ESC
				</kbd>
			</div>
			<Border borderWidth="0.5px" withOutSpacing={true} />
			<Spacing size={'10px'} />
			<SearchResult
				list={resultList}
				onItemClickHandler={onItemClickHandler}
			/>
			<Spacing size={'10px'} />
		</>
	);
}
