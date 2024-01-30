import { NextRequest, NextResponse } from 'next/server';
import { Request, Response } from 'express';
import { NextApiRequest, NextApiResponse } from 'next';
import uploadFileToS3 from '@/aws';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
	return NextResponse.json({ msg: 'connect' });
}

interface RequestBody {
	title: string;
	category: number;
	contents: string;
	thumbnail?: string;
	files?: File[];
}
type NextApiRequestWithFormData = NextApiRequest & Request & { files: any[] };
type NextApiResponseCustom = NextApiResponse & Response;
export async function POST(
	request: NextRequest,
	response: NextApiResponseCustom
) {
	try {
		const formData = await request.formData();
		const files = formData.getAll('files') as File[];
		const blobData = formData.get('data') as Blob;
		const data = JSON.parse(await blobData.text());

		if (!files) {
			return NextResponse.json(
				{ error: 'File is not attached.' },
				{ status: 400 }
			);
		}
		//파일 저장
		const fileUrls = [];
		for (const file of files) {
			const buffer = Buffer.from(await file.arrayBuffer());
			const url = await uploadFileToS3(buffer);
			fileUrls.push({ url });
		}

		//Post 데이터저장하고
		const newPost: Prisma.PostCreateInput = {
			title: data.title,
			contents: data.contents,
			thumbnail: fileUrls[0].url,
		};

		console.log('newPost is ', newPost);
		const result = await prisma?.post.create({
			data: {
				...newPost,
				images: {
					createMany: {
						data: fileUrls,
					},
				},
				categories: {
					create: [
						{
							Category: {
								connect: {
									id: 1,
								},
							},
						},
						{
							Category: {
								connect: {
									id: 2,
								},
							},
						},
					],
				},
			},
		});

		console.log('got result ', result);
		//받은 id로 Image테이블에 fileUrls 저장
		return NextResponse.json({ msg: 'Success', fileUrls });
	} catch (error) {
		console.log('error is ', error);
		return NextResponse.json({ error });
	}
}
