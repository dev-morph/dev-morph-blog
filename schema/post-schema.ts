import { z } from 'zod';

export const postSchema = z.object({
	title: z.string().min(1, { message: 'title은 필수 입력 항목입니다.' }),
	category: z
		.string()
		.min(1, { message: 'category는 필수 입력 항목입니다.' }),
	content: z.string().min(10, { message: 'content는 필수 입력 항목입니다.' }),
});

export type PostSchema = z.infer<typeof postSchema>;
