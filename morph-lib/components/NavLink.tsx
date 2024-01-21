import Link from 'next/link';
import classes from '@morphlib/sass/NavLink.module.scss';

export default function NavLink({
	href,
	text,
}: {
	href: string;
	text: string;
}) {
	return (
		<div className={classes.header__item}>
			<Link href={href}>
				<span>{text}</span>
			</Link>
		</div>
	);
}
