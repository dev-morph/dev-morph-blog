import prisma from '@/utils/db/mysql-prisma-db';
import { String } from 'aws-sdk/clients/cloudhsm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: { name: String } }
) {
	try {
		const result = await prisma.category.findFirst({
			where: {
				name: params.name,
			},
		});
		return new NextResponse(
			JSON.stringify({
				message: `Success to find Category.`,
				data: result,
			}),
			{ status: 200 }
		);
	} catch (error) {
		return new NextResponse(
			JSON.stringify({
				message: 'Failed to find Category.',
				error,
			}),
			{
				status: 209,
			}
		);
	}
}
