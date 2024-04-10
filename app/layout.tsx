import type { Metadata } from 'next';
import { Inter, Open_Sans } from 'next/font/google';
import MainNavigation from '@/components/main-navigation/MainNavigation';
import '@/styles/globals.scss';
import ContentWrapper from '@morphlib/components/ContentWrapper';
import NotificationOverlay from '@morphlib/components/NotificationOverlay';
import AuthProvider from '@/components/provider/AuthProvider';
import QueryProvider from '@/components/provider/QueryProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DialogOverlay from '@/morph-lib/components/DialogOverlay';
import Footer from '@/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] });
const open_sans = Open_Sans({ subsets: ['latin'] });

//next.js 14부터는 아래 두 가지는 default로 적용되기에, 따로 적용해 줄 필요 없다.
//<meta charset="utf-8" />
//<meta name="viewport" content="width=device-width, initial-scale=1" />
export const metadata: Metadata = {
	title: 'morph blog',
	description: 'morph Blog built in Nextjs 14',
	verification: {
		google: 'oRP7Q2tUt8FtNyBE1qs3hBvs42adWCSZkwvkqb5cP5s',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={open_sans.className}>
				<AuthProvider>
					<QueryProvider>
						<MainNavigation />
						<ContentWrapper>{children}</ContentWrapper>
						<DialogOverlay />
						<NotificationOverlay />
					</QueryProvider>
				</AuthProvider>
				<ToastContainer />
				<Footer />
			</body>
		</html>
	);
}
