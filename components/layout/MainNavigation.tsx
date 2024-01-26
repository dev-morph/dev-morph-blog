import Link from 'next/link';
import Logo from './logo';
import classes from './main-navigation.module.scss';
import Navigation from '@/morph-lib/components/Navigation';
import Text from '@morphlib/components/Text';

export default function MainNavigation() {
	return (
		<header className={classes.header}>
			<Link href="/">
				<Logo />
			</Link>
			<Navigation>
				<Navigation.NavLink href="/posts" text="Posts" />
				<Navigation.NavLink href="/about" text="About" />
				<Navigation.NavLink href="/login" text="Login" />
			</Navigation>
		</header>
	);
}
