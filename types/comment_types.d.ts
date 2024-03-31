export type NewCommentType = {
	post_id: number;
	username: string;
	password: string;
	comment: string;
};

export type CommentType = {
	id: number;
	post_id: number;
	username: string;
	password: string;
	comment: string;
	created_at: Date;
	updated_at: Date | null;
};
