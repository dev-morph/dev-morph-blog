export type NewCommentType = {
	post_id: number;
	username: string;
	password: string;
	comment: string;
	avatar_image: string;
};

export type UpdateCommentType = {
	id: number;
	post_id?: number;
	username?: string;
	password?: string;
	comment?: string;
	avatar_image?: string;
};

export type CommentType = {
	id: number;
	post_id: number;
	username: string;
	password: string;
	comment: string;
	avatar_image: string;
	created_at: Date;
	updated_at: Date | null;
};
