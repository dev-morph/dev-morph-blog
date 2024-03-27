import { z } from 'zod';

export const commentSchema = z.object({
	comment: z
		.string()
		.trim()
		.min(1, { message: 'comment는 필수 입력 항목입니다.' }),
	username: z
		.string()
		.trim()
		.min(1, { message: '자유롭게 닉네임을 정해주세요.' })
		.max(10, { message: '닉네임은 10글자를 초과할 수 없습니다.' }),
});

export type CommentSchema = z.infer<typeof commentSchema>;
