'use client';

import Link from 'next/link';
import Logo from './logo';
import classes from './main-navigation.module.scss';
import Navigation from '@morphlib/components/Navigation';
import { useSession, signOut } from 'next-auth/react';
import Provider from '@/components/provider/AuthProvider';
import { CategoryType } from '@/types/category_types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Search from '@/morph-lib/components/Search/Search';
import Modal from '@/morph-lib/components/Modal/Modal';
import SearchModal from '@/morph-lib/components/Search/SearchModal';
import useHotKeys from '@/morph-lib/hooks/useHotKeys';

export default function MainNavigation() {
	const { data: session } = useSession();
	const {
		isKeyPressed: isSearchCmdPressed,
		setIsKeyPressed,
		shouldEscape,
		setShouldEscape,
	} = useHotKeys();
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	useEffect(() => {
		if (isSearchCmdPressed) {
			setIsSearchOpen(true);
			setIsKeyPressed(false);
		}
		if (shouldEscape) {
			setIsSearchOpen(false);
			setShouldEscape(false);
		}
	}, [isSearchCmdPressed, setIsKeyPressed, shouldEscape, setShouldEscape]);

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
					<Modal isOpen={isSearchOpen} onOpenChange={setIsSearchOpen}>
						<Modal.Trigger>
							{({ isOpen }) => <Search />}
						</Modal.Trigger>
						<Modal.Content>
							<SearchModal
								onCloseModal={() => setIsSearchOpen(false)}
							/>
						</Modal.Content>
					</Modal>
					<Navigation.NavLink href="/posts/tag/ALL" text="POSTS" />
					<Navigation.NavLink href="/about" text="ABOUT" />
					{session && +session.user?.role_id === 1 && (
						<>
							<Navigation.NavLink
								href="/new-post"
								text="NEWPOST"
							/>
							<Navigation.NavLink href="/admin" text="ADMIN" />
						</>
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
			</header>
		</Provider>
	);
}
