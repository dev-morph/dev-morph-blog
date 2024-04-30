import { NextRequest, NextResponse } from 'next/server';
import uploadFileToS3 from '@/aws';
import prisma from '@/utils/db/mysql-prisma-db';
import elasticClient from '@/utils/db/elastic-db';
import { Prisma } from '@prisma/client';

// export async function GET(request: NextRequest) {
// 	let result;
// 	try {
// 		result = await prisma?.post.findMany({
// 			include: {
// 				images: true,
// 				categories: true,
// 			},
// 		});
// 	} catch (error) {
// 		console.log('error occurerd!');
// 		// console.log('error occurerd!', error);
// 		result = error;
// 	}
// 	return NextResponse.json({ msg: 'Success', data: result });
// }

type PostBodyType = {
	id?: number;
	title: string;
	category: string;
	contents: string;
	thumbnail?: string | null;
	files?: File[];
};

export async function POST(request: NextRequest, response: NextResponse) {
	try {
		const formData = await request.formData();
		const files = formData.getAll('files') as File[];
		const blobData = formData.get('data') as Blob;
		const data: PostBodyType = JSON.parse(await blobData.text());

		if (!files) {
			return NextResponse.json(
				{ error: 'File is not attached.' },
				{ status: 400 }
			);
		}

		const newPost: Prisma.PostCreateInput = {
			title: data.title,
			contents: data.contents,
			thumbnail: '',
		};

		//파일 저장
		const uploadedFiles = [];
		for (const file of files) {
			const buffer = Buffer.from(await file.arrayBuffer());
			const url = await uploadFileToS3(buffer);

			if (file.name === data.thumbnail) {
				newPost.thumbnail = url;
			}
			uploadedFiles.push({ url, filename: file.name });
		}

		//Post 데이터저장
		//받은 id로 Image테이블에 uploadedFiles 저장
		const result = await prisma?.post.create({
			data: {
				...newPost,
				images: {
					createMany: {
						data: uploadedFiles,
					},
				},
				categories: {
					create: [
						{
							Category: {
								connect: {
									id: +data.category,
								},
							},
						},
					],
				},
			},
			include: {
				images: true,
				categories: true,
			},
		});

		await savePostElastic({
			...newPost,
			category: data.category,
			id: result.id,
		});

		return NextResponse.json({ msg: 'Success', result });
	} catch (error) {
		console.log('post route error occurs!');
		return NextResponse.json({ error });
	}
}

async function savePostElastic(post: PostBodyType) {
	const categoryResponse = await prisma.category.findFirst({
		where: {
			id: +post.category,
		},
	});

	return elasticClient.index({
		index: 'posts',
		document: {
			...post,
			category: categoryResponse?.name,
		},
	});
}
