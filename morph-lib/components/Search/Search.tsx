import classes from '@morphlib/sass/Search.module.scss';
import SearchIcon from '@/components/ui/icons/search-icon';

export default function Search() {
	return (
		<div className={classes.header__search__control}>
			<div className={classes.search__icon}>
				<SearchIcon size="20" />
			</div>
			<button className={classes.search__btn}>
				<span>Search documentation...</span>
				<kbd className={classes.kbd}>⌘ K</kbd>
			</button>
		</div>
	);
}
