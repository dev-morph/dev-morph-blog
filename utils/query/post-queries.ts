import { useQuery } from '@tanstack/react-query';
import {
	getAllPosts,
	getPostByCategoryName,
	getRecentPosts,
} from '../posts-utils';

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

export function useGetRecentPosts() {
	return useQuery({
		queryKey: ['recentPosts'],
		queryFn: async () => getRecentPosts(),
	});
}
