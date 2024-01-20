import Link from 'next/link';
import Logo from './logo';
import classes from './main-navigation.module.scss';

export default function MainNavigation() {
	return (
		<header className={classes.header}>
			<Link href="/">
				<Logo />
			</Link>
			<nav className={classes.nav}>
				<div className={classes.header__item}>
					<Link href="/posts">Posts</Link>
				</div>
				<div className={classes.header__item}>
					<Link href="/about">About</Link>
				</div>
				<div className={classes.header__item}>
					<Link href="/contact">Contact</Link>
				</div>
			</nav>
		</header>
	);
}
