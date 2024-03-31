import { useQuery } from '@tanstack/react-query';
import {
	getAllPosts,
	getPostByCategoryName,
	getPostById,
	getRecentPosts,
} from '../posts-utils';

export function useGetPosts() {
	return useQuery({
		queryKey: ['posts'],
		queryFn: async () => getAllPosts(),
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

export function useGetPostById(postId: number) {
	return useQuery({
		queryKey: ['post', postId],
		queryFn: async () => getPostById(`${postId}`),
	});
}
