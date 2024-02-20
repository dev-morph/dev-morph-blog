import PostForm from '@/components/post-form/PostForm';
import Spacing from '@/morph-lib/components/Spacing';
import { getAllCategories } from '@/utils/category-utils';
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from '@tanstack/react-query';

export default async function NewPost() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['category'],
		queryFn: getAllCategories,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<PostForm />
		</HydrationBoundary>
	);
}
