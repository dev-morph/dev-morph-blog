import ChipItem from './ChipItem';
import classes from '@morphlib/sass/Chips.module.scss';

function Chips({ children }: { children: React.ReactNode }) {
	return <div className={classes.chips}>{children}</div>;
}

Chips.Item = ChipItem;

export default Chips;
