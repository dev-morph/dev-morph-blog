import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { MongoClient } from 'mongodb';

const schema = z.object({
	email: z.string().email({ message: 'email 형식에 맞지 않습니다.' }),
	name: z.string().min(1, { message: '필수 입력 값 입니다.' }),
	message: z
		.string()
		.min(4, { message: '메시지는 4글자 이상이어야 합니다.' }),
});

export async function GET(req: Request, res: any) {
	return Response.json({ message: 'hoihoi' });
}

export async function POST(req: Request, res: Response) {
	const body = await req.json();
	console.log('body is ', body);
	const validateResult = schema.safeParse(body);
	if (!validateResult.success) {
		const { errors } = validateResult.error;
		return new NextResponse(
			JSON.stringify({
				message: `${errors[0].path[0]} is invalid: ${errors[0].message}`,
			}),
			{
				status: 410,
			}
		);
	}
	const uri =
		'mongodb+srv://morph:dlgudxo90@cluster0.ylnocti.mongodb.net/my-site?retryWrites=true&w=majority';

	let client;
	try {
		client = await MongoClient.connect(uri);
	} catch (error) {
		return new NextResponse(
			JSON.stringify({
				message: 'could not connect database.',
			}),
			{
				status: 500,
			}
		);
	}

	const db = client.db();
	const newMessage = { ...body };
	try {
		const result = await db.collection('messages').insertOne(body);
		newMessage.id = result.insertedId;
	} catch (error) {
		client.close();
		return new NextResponse(
			JSON.stringify({
				message: 'failed to store messages to database.',
			}),
			{
				status: 500,
			}
		);
	}

	client.close();
	return NextResponse.json({ message: 'hoi', data: body });
}
