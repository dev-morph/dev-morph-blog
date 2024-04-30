import prisma from '@/utils/db/mysql-prisma-db';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
	const body = await req.json();
	// const newUser : Prisma.UserCreateInput = {
	// 	username: body.username,
	// 	password: bcrypt.hashSync(body.password, 10)
	// }
	try {
		const user = await prisma.user.create({
			data: {
				username: body.username,
				password: bcrypt.hashSync(body.password, 10),
				Role: {
					connect: {
						id: 2,
					},
				},
			},
			include: {
				Role: true,
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
