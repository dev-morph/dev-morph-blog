import { z } from 'zod';

export const signupSchema = z
	.object({
		username: z.string().min(1, { message: '필수 입력 항목입니다.' }),
		password: z.string().min(1, { message: '필수 입력 항목입니다.' }),
		passwordCheck: z
			.string()
			.min(1, { message: '패스워드가 일치하지 않습니다.' }),
	})
	.refine((data) => data.password === data.passwordCheck, {
		path: ['passwordCheck'],
		message: '비밀번호가 일치하지 않습니다.',
	});

export type SignupPasswordCheckSchema = z.infer<typeof signupSchema>;
