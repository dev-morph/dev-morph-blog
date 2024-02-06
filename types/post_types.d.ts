export type ImageType = {
	id: number;
	url: string;
	filename: string;
	post_id: number;
	created_at: string;
};

export type PostType = {
	id: number;
	title: string;
	images: ImageType[];
	contents: string;
	thumbnail: string;
	categories: any[];
	created_at: string;
};

export type StaticPostType = {
	title: string;
	excerpt: string;
	date: string;
	content: string;
};
