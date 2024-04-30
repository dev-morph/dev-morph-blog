import classes from '@morphlib/sass/Search.module.scss';

export default function Search() {
	return (
		<div className={classes.header__search__control}>
			<button className={classes.search__btn}>
				<span>Search documentation...</span>
				<kbd className={classes.kbd}>⌘ K</kbd>
			</button>
		</div>
	);
}
