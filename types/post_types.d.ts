import { CategoryType, PrismaCategoryType } from './category_types';

export type ImageType = {
	id: number;
	url: string;
	filename: string;
	post_id: number;
	created_at: Date;
	updated_at?: Date | null;
};

export type PostType = {
	id: number;
	title: string;
	images: ImageType[];
	contents: string;
	thumbnail: string | null;
	categories: PrismaCategoryType[];
	created_at: Date;
};

export type StaticPostType = {
	title: string;
	excerpt: string;
	date: string;
	content: string;
};

export type PostsBasedCategoryType = {
	id: number;
	title: string;
	contents: string;
	hits: number;
	images: ImageType[];
	thumbnail: string | null;
	created_at: Date;
	updated_at?: Date | null;
};

export type SearchResultType = {
	id: number;
	title: string;
	contents: string;
	category: string;
};
