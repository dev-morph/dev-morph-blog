'use client';

import InputWithLabel from '@/morph-lib/components/InputWithLabel';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import showToast from '@/morph-lib/utils/toast';

export default function NewPostForm() {
	const router = useRouter();
	const { data: session } = useSession();

	useEffect(() => {
		if (!session?.user.role || +session?.user.role !== 1) {
			router.push('/');
			showToast({ message: '잘못된 접근입니다.', type: 'error' });
		}
	}, [router, session]);
	return (
		<form>
			<InputWithLabel htmlFor="title" labelText="title" />
		</form>
	);
}
