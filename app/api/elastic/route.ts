import { NextRequest, NextResponse } from 'next/server';
import elasticClient from '@/utils/db/elastic-db';

export async function GET(request: NextRequest, { params }: { params: any }) {
	try {
		const result = await elasticClient.search({
			index: 'posts',
			query: {
				match: {
					contents: {
						query: 'INSERT',
					},
				},
			},
			explain: true,
		});

		return NextResponse.json({ msg: 'Success', data: result });
	} catch (error) {
		console.log('error occured! ', error);
	}

	return NextResponse.json({ msg: 'Success' });
}

export async function POST(request: NextRequest, response: NextResponse) {
	const data = await request.json();
	const result = await elasticClient.index({
		index: 'posts',
		document: {
			...data,
		},
	});

	return NextResponse.json({ msg: 'Success', data: result });
}
