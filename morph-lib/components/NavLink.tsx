import Link from 'next/link';
import classes from '@morphlib/sass/NavLink.module.scss';
import { MouseEventHandler } from 'react';

export default function NavLink({
	href,
	text,
	onClick,
}: {
	href?: string;
	text?: string;
	onClick?: MouseEventHandler<HTMLElement>;
}) {
	return (
		<div className={classes.header__item} onClick={onClick}>
			{href ? (
				<Link href={href && href}>
					<span>{text}</span>
				</Link>
			) : (
				<span>{text}</span>
			)}
		</div>
	);
}
