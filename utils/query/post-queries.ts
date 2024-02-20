import { useQuery } from '@tanstack/react-query';
import { getAllPosts, getPostByCategoryName } from '../posts-utils';
import { PostType } from '@/types/post_types';

export function useGetPosts() {
	return useQuery({
		queryFn: async () => getAllPosts(),
		queryKey: ['posts'],
	});
}

export function useGetPostsByCategoryName(categoryName: string) {
	return useQuery({
		queryKey: ['postsByCategory'],
		queryFn: async () => {
			const response = await fetch(`/api/post/category`, {
				method: 'POST',
				body: JSON.stringify({ categoryName }),
			});
			if (!response.ok) {
				throw new Error('failed to get Posts by categoryname');
			}

			const { data } = await response.json();
			return data as PostType[];
		},
	});
}
