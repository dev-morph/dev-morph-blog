import prisma from '@/db';
import * as bcrypt from 'bcrypt';

interface RequestBody {
	username: string;
	password: string;
}

export async function POST(request: Request) {
	const body: RequestBody = await request.json();

	const user = await prisma.user.findFirst({
		where: {
			username: body.username,
		},
		include: {
			Role: true,
		},
	});

	if (user && (await bcrypt.compare(body.password, user.password))) {
		const { password, ...userWithoutPass } = user;
		return new Response(JSON.stringify(userWithoutPass));
	} else return new Response(JSON.stringify(null));
}
