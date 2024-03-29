import { z } from 'zod';

export const postSchema = z.object({
	title: z.string().min(1, { message: 'title은 필수 입력 항목입니다.' }),
	contents: z
		.string()
		.min(10, { message: 'content는 필수 입력 항목입니다.' }),
});

export type PostSchema = z.infer<typeof postSchema>;
