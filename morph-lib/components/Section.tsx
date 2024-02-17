import classes from '@morphlib/sass/Section.module.scss';

export default function Section({ children }: { children: React.ReactNode }) {
	return <div className={classes.section}>{children}</div>;
}
