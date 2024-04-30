import Top04 from '../Top/Top04';
import Text from '../Text';
import SearchResultItem from './SearchResultItem';
import classes from '@morphlib/sass/Search.module.scss';
import Spacing from '../Spacing';
import { SearchResultType } from '@/types/post_types';

export default function SearchResult({ list }: { list: SearchResultType[] }) {
	return (
		<>
			<Spacing size={10} />
			<Text
				size="0.85rem"
				fontWeight="bold"
				color="var(--fontColor-muted)"
				styled={{ paddingLeft: '1rem' }}
			>
				Results
			</Text>

			<Spacing size={20} />
			<div className={classes.search__item__wrapper}>
				{list &&
					list.length > 0 &&
					list.map((item) => (
						<SearchResultItem key={item.id} item={item} />
					))}
			</div>
		</>
	);
}
