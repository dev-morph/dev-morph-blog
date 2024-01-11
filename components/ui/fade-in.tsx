import classes from './fade-in.module.scss';

export default function FadeIn({ children }: { children: React.ReactNode }) {
	return <div className={classes.fade__in}>{children}</div>;
}
