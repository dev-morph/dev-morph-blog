'use client';

import Link from 'next/link';
import Logo from './logo';
import classes from './main-navigation.module.scss';
import Navigation from '@morphlib/components/Navigation';
import { useSession, signOut } from 'next-auth/react';
import Provider from '@/components/sessionProvider/Provider';

export default function MainNavigation() {
	const { data: session } = useSession();

	return (
		<Provider>
			<header className={classes.header}>
				<Link href="/">
					<Logo />
				</Link>
				<Navigation>
					<Navigation.NavLink href="/posts" text="Posts" />
					<Navigation.NavLink href="/about" text="About" />
					{session && session.user ? (
						<Navigation.NavLink
							text="LogOut"
							onClick={() => signOut()}
						/>
					) : (
						<Navigation.NavLink href="/login" text="Login" />
					)}
				</Navigation>
			</header>
		</Provider>
	);
}
