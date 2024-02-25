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
		queryKey: [`postsByCategory/${categoryName}`, categoryName],
		queryFn: async () => getPostByCategoryName(categoryName),
	});
}
