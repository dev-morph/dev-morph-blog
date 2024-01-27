import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const schema = z.object({
	title: z.string().min(1, { message: '필수 입력 항목입니다.' }),
	contents: z.string().min(1, { message: '필수 입력 항목입니다.' }),
});

export async function GET(req: Request, res: any) {
	const prisma = new PrismaClient();
	const allUsers = await prisma.users.findMany();
	return Response.json({ message: 'hoihoi' });
}

export async function POST(req: Request, res: Response) {
	const body = await req.json();
	const prisma = new PrismaClient();
	const user = await prisma.users.create({
		data: {
			username: body.username,
			password: bcrypt.hashSync(body.password, 10),
			role: 1,
		},
	});

	const { password, ...result } = user;

	return Response.json(JSON.stringify(result));
}

// export async function POST(req: Request, res: Response) {
// 	const body = await req.json();
// 	const validateResult = schema.safeParse(body);
// 	if (!validateResult.success) {
// 		const { errors } = validateResult.error;
// 		return new NextResponse(
// 			JSON.stringify({
// 				message: `${errors[0].path[0]} is invalid: ${errors[0].message}`,
// 			}),
// 			{
// 				status: 410,
// 			}
// 		);
// 	}
// 	const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ylnocti.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

// 	let client;
// 	try {
// 		client = await MongoClient.connect(connectionString);
// 	} catch (error) {
// 		return new NextResponse(
// 			JSON.stringify({
// 				message: 'could not connect database.',
// 			}),
// 			{
// 				status: 500,
// 			}
// 		);
// 	}

// 	const db = client.db();
// 	const newMessage = { ...body };
// 	try {
// 		const result = await db.collection('messages').insertOne(body);
// 		newMessage.id = result.insertedId;
// 	} catch (error) {
// 		client.close();
// 		return new NextResponse(
// 			JSON.stringify({
// 				message: 'failed to store messages to database.',
// 			}),
// 			{
// 				status: 500,
// 			}
// 		);
// 	}

// 	client.close();
// 	return NextResponse.json({ message: 'hoi', data: body });
// }

// async function connectDB() {
// 	const connection = await mysql.createConnection({
// 		host: 'localhost',
// 		user: 'root',
// 		database: 'blog',
// 		password: '!dlgudxo90',
// 	});

// 	return connection;
// }
