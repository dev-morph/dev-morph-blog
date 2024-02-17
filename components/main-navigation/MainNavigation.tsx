'use client';

import Link from 'next/link';
import Logo from './logo';
import classes from './main-navigation.module.scss';
import Navigation from '@morphlib/components/Navigation';
import { useSession, signOut } from 'next-auth/react';
import Provider from '@/components/sessionProvider/Provider';
import { CategoryType } from '@/types/category_types';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MainNavigation() {
	const { data: session } = useSession();
	const [categories, setCategories] = useState<CategoryType[]>([]);

	useEffect(() => {
		(async () => {
			const { data } = await axios.get('/api/category');
			setCategories(data.data);
		})();
	}, []);

	return (
		<Provider>
			<header className={classes.header}>
				<Link href="/">
					<Logo />
				</Link>

				<Navigation>
					<Navigation.NavLink href="/posts" text="POSTS" />
					<Navigation.NavLink href="/about" text="ABOUT" />
					{session && +session.user?.role_id === 1 && (
						<Navigation.NavLink href="/new-post" text="NEWPOST" />
					)}
					{session && session.user ? (
						<Navigation.NavLink
							text="LOGOUT"
							onClick={() => signOut({ callbackUrl: '/' })}
						/>
					) : (
						<Navigation.NavLink href="/login" text="LOGIN" />
					)}
				</Navigation>
				{/* <Navigation>
					<HoverDropdown
						trigger={
							<HoverDropdown.Trigger>Post</HoverDropdown.Trigger>
						}
						menu={
							<HoverDropdown.Menu>
								{categories.map((category) => (
									<HoverDropdown.Item key={category.id}>
										<Navigation.NavLink
											href={`/${category.name}`}
											text={`${category.name}`}
										/>
									</HoverDropdown.Item>
								))}
							</HoverDropdown.Menu>
						}
					></HoverDropdown>
					<Navigation.NavLink href="/about" text="About me" />
					{session && +session.user?.role_id === 1 && (
						<Navigation.NavLink href="/new-post" text="NewPost" />
					)}
					{session && session.user ? (
						<Navigation.NavLink
							text="LogOut"
							onClick={() => signOut({ callbackUrl: '/' })}
						/>
					) : (
						<Navigation.NavLink href="/login" text="Login" />
					)}
				</Navigation> */}
			</header>
		</Provider>
	);
}
