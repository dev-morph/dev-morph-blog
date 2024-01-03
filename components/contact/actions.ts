'use server';
import { z } from 'zod';

export async function sendMessage(prevState: any, formData: FormData) {
	console.log('start');
	console.log('formData ', formData);

	let resultMessage;
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
		resultMessage = `${errors[0].path[0]} should not be empty.`;
	} else {
		resultMessage = 'good';
	}

	return { message: resultMessage };
}
