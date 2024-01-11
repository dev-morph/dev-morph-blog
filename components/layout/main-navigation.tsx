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
				<ul>
					<li className={classes.header__item}>
						<Link href="/posts">Posts</Link>
					</li>
					<li className={classes.header__item}>
						<Link href="/contact">Contact</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
