import { NextResponse } from 'next/server';
import upload from '@/aws';
import { RequestHandler, Request, Response } from 'express';
import { NextApiRequest, NextApiResponse } from 'next';
import runMiddleware from '@/utils/runMiddleware';

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
	request: NextApiRequestWithFormData,
	response: NextApiResponseCustom
) {
	const result = await runMiddleware(
		request,
		response,
		upload.single('files')
	);

	console.log('result is ', result);

	// const formData = await request.formData();
	// const files = (formData.get("files"));
	// const blobData = formData.get('data') as Blob;
	// const data = JSON.parse(await blobData.text());

	// await axios.post('/', imageUploader.single('img'),)

	// const body: RequestBody = await request.json();

	new NextResponse('Success');
}
