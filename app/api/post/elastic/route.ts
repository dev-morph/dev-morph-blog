import { NextRequest, NextResponse } from 'next/server';
import elasticClient from '@/utils/db/elastic-db';
import { SearchResultType } from '@/types/post_types';
import { SearchTotalHits } from '@elastic/elasticsearch/lib/api/types';

export async function GET(request: NextRequest) {
	try {
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
				highlight: {
					fields: {
						title: {},
						category: {},
						contents: {},
					},
				},
			});
			const total = response.hits.total as SearchTotalHits;
			if (total.value === 0) {
				return NextResponse.json({
					status: 200,
					msg: 'Success',
					data: [],
				});
			}
			const parsedResult = response.hits.hits.map((hit) => {
				const postData = hit._source as SearchResultType;
				//검색한 데이터
				const result = {
					title: postData.title,
					category: postData.category,
					id: postData.id,
					highlight: hit.highlight,
				};
				return result;
			});
			return NextResponse.json({
				status: 200,
				msg: 'Success',
				data: parsedResult,
			});
		}
		return NextResponse.json({
			status: 204,
			msg: "There's no keyword to search.",
		});
	} catch (error) {
		console.log('error occured! ', error);
	}

	return NextResponse.json({
		status: 204,
		msg: 'Failed to search post.',
	});
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
