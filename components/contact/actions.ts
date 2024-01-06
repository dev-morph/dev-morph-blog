'use server';

import { z } from 'zod';
import { CommonCode } from '@/constants/common_code';
import { FormValidationType } from '@/types/form_types';

export async function sendMessage(prevState: any, formData: FormData) {
	const result: FormValidationType = {
		message: null,
		element: null,
	};

	const schema = z.object({
		email: z.string().email(),
		name: z.string().min(1),
		message: z.string().min(1),
	});

	const response = schema.safeParse({
		email: formData.get('email'),
		name: formData.get('name'),
		message: formData.get('message'),
	});

	if (!response.success) {
		const { errors } = response.error;
		console.log('invalid formData', errors);
		result.message = CommonCode.FAIL_TO_VALIDATE;
		result.element = errors[0].path[0];
	} else {
		result.message = CommonCode.SUCCESS;
	}

	return result;
}
