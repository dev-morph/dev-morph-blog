import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MainNavigation from '@/components/layout/main-navigation';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

//next.js 14부터는 아래 두 가지는 default로 적용되기에, 따로 적용해 줄 필요 없다.
//<meta charset="utf-8" />
//<meta name="viewport" content="width=device-width, initial-scale=1" />
export const metadata: Metadata = {
	title: 'morph blog',
	description: 'morph Blog built in Nextjs 14',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<MainNavigation />
				{children}
				<div id="notifications"></div>
			</body>
		</html>
	);
}
