import { useQuery } from '@tanstack/react-query';
import { getAllCategoriesFromServer } from '../category-utils';

export function useGetCategories() {
	return useQuery({
		queryFn: getAllCategoriesFromServer,
		queryKey: ['category'],
		refetchInterval: 1000 * 60 * 60, // 1시간
	});
}
