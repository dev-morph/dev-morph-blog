import { NextRequest, NextResponse } from 'next/server';
import elasticClient from '@/utils/db/elastic-db';

export async function GET(request: NextRequest) {
	try {
		let result = [];
		const keyword = request.nextUrl.searchParams.get('keyword');
		if (keyword) {
			const response = await elasticClient.search({
				index: 'posts',
				query: {
					multi_match: {
						query: keyword,
						type: 'most_fields',
						fields: ['title', 'category', 'contents'],
						operator: 'OR',
					},
				},
				explain: true,
			});
			console.log('keyword is ', keyword);
			console.log('response is ', response);

			result = [...response.hits.hits.map((hit) => hit._source)];
			console.log('result is ', result);
			return NextResponse.json({ msg: 'Success', data: result });
		}
		return;
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
