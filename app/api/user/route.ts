import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
	const body = await req.json();
	let prisma;
	try {
		prisma = new PrismaClient();
	} catch (error) {
		return new NextResponse(JSON.stringify('failed to connect DB.'), {
			status: 209,
		});
	}

	try {
		const user = await prisma.users.create({
			data: {
				username: body.username,
				password: bcrypt.hashSync(body.password, 10),
				role: 2,
			},
		});
		const { password, ...result } = user;
		return new NextResponse(
			JSON.stringify({
				message: 'Success to create a user',
				data: result,
			}),
			{ status: 200 }
		);
	} catch (error) {
		let message = 'failed to create User.';
		if (error instanceof Error) message += ` - ${error.message}`;
		return new NextResponse(JSON.stringify(message), {
			status: 209,
		});
	}
}
