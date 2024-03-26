import { z } from 'zod';

export const commentSchema = z.object({
	comment: z
		.string()
		.trim()
		.min(1, { message: 'comment는 필수 입력 항목입니다.' }),
});

export type CommentSchema = z.infer<typeof commentSchema>;
