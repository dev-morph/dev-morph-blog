import classes from './toc.module.scss';

type TocProps = {
	content: any;
};

export default function Toc({ content }: TocProps) {
	console.log('content is ', content);
	return <div className={classes.toc}>hoihoi</div>;
}
