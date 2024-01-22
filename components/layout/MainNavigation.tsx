import Link from 'next/link';
import Logo from './logo';
import classes from './main-navigation.module.scss';
import Navigation from '@/morph-lib/components/Navigation';

export default function MainNavigation() {
	return (
		<header className={classes.header}>
			<Link href="/">
				<Logo />
			</Link>
			<Navigation>
				<Navigation.NavLink href="/posts" text="Posts" />
				<Navigation.NavLink href="/about" text="About" />
				{/* <Navigation.NavLink href="/contact" text="Contact" /> */}
			</Navigation>
		</header>
	);
}
