import prisma from '@/db';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: Request) {
	try {
		const result = await prisma.category.findMany();
		return new NextResponse(
			JSON.stringify({
				message: 'Success to get All Categories.',
				data: result,
			}),
			{ status: 200 }
		);
	} catch (error) {
		return new NextResponse(
			JSON.stringify({
				message: 'Failed to get All Categories.',
				error,
			}),
			{
				status: 209,
			}
		);
	}
}

export async function POST(request: NextRequest) {
	const data = await request.json();
	const newCategory: Prisma.CategoryCreateInput = {
		id: data.id,
		name: data.name,
		sort_order: data.sort_order,
	};
	try {
		const result = await prisma.category.create({
			data: newCategory,
		});
		return new NextResponse(
			JSON.stringify({
				message: 'Success to create a new category.',
				data: result,
			}),
			{ status: 200 }
		);
	} catch (error) {
		return new NextResponse(
			JSON.stringify({
				message: 'Failed to create a new category.',
				error,
			}),
			{
				status: 209,
			}
		);
	}
}
