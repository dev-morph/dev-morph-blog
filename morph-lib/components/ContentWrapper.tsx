import classes from '@morphlib/sass/ContentWrapper.module.scss';

type ContentWrapperProps = {
	className?: string;
	children: React.ReactNode;
};

export default function ContentWrapper({ children }: ContentWrapperProps) {
	return (
		<div className={classes.content__wrapper}>
			<section className={classes.content}>{children}</section>
		</div>
	);
}
