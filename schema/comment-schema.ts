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
	password: z
		.string()
		.trim()
		.min(3, { message: '비밀번호는 최소 3글자 이상이어야 합니다.' })
		.max(10, { message: '비밀번호는 10글자를 초과할 수 없습니다.' }),
});

export type CommentSchema = z.infer<typeof commentSchema>;
