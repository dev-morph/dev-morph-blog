import { PrismaClient } from '@prisma/client';

interface RequestBody {
	title: string;
	category: number;
	contents: string;
	thumbnail?: string;
}

export async function POST(request: Request) {
	const prisma = new PrismaClient();
	const body: RequestBody = await request.json();
}
