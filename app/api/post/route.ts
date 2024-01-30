import { NextRequest, NextResponse } from 'next/server';
import { Request, Response } from 'express';
import { NextApiRequest, NextApiResponse } from 'next';
import uploadFileToS3 from '@/aws';

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
		const file = formData.get('files') as Blob;
		const blobData = formData.get('data') as Blob;
		const data = JSON.parse(await blobData.text());

		if (!file) {
			return NextResponse.json(
				{ error: 'File is not attached.' },
				{ status: 400 }
			);
		}
		//파일 저장
		const fileFormData = file as unknown as Blob;
		const buffer = Buffer.from(await fileFormData.arrayBuffer());
		const filename = await uploadFileToS3(buffer);

		//데이터

		return NextResponse.json({ msg: 'Success', filename });
	} catch (error) {
		console.log('error is ', error);
		return NextResponse.json({ error });
	}
}
