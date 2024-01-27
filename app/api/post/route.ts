import prisma from '@/db';

interface RequestBody {
	title: string;
	category: number;
	contents: string;
	thumbnail?: string;
}

export async function POST(request: Request) {
	const body: RequestBody = await request.json();
}
