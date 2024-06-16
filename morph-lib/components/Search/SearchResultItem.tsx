import DocSearchHitIcon from '@/components/ui/icons/doc-search-hit-icon';
import Text from '../Text';
import classes from '@morphlib/sass/Search.module.scss';
import DocSearchHitSelectIcon from '@/components/ui/icons/doc-search-hit-select-icon';
import { SearchResultType } from '@/types/post_types';

export default function SearchResultItem({ item }: { item: SearchResultType }) {
	return (
		<>
			<div className={classes.search__item}>
				<div className={classes.search__hit__icon}>
					<DocSearchHitIcon size="20" />
				</div>
				<div className={classes.search__item__contents}>
					<Text className={classes.search__item__title}>
						{item.title}
					</Text>
					<div>{item.contents}</div>
					{item.highlight.contents && (
						<div
							dangerouslySetInnerHTML={{
								__html: item.highlight.contents[0],
							}}
						></div>
					)}
				</div>
				<div className={classes.search__hit__select__icon}>
					<DocSearchHitSelectIcon size="12" />
				</div>
			</div>
		</>
	);
}
