import classes from './fade-in.module.scss';

type FadeInFromType = 'left' | 'right' | 'bottom' | 'top' | undefined;

export default function FadeIn({
	children,
	from,
}: {
	children: React.ReactNode;
	from?: FadeInFromType;
}) {
	const fadeClass = from
		? `${classes.fade__in} ${classes[from]}`
		: classes.fade__in;

	return <div className={fadeClass}>{children}</div>;
}
