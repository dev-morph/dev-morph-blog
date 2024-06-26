import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { getFormatedDate } from './morph-lib/utils/dateUtils';

export const s3Client = new S3Client({
	region: 'ap-northeast-2',
	credentials: {
		accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
		secretAccessKey: process.env.AWS_S3_SECRET_KEY as string,
	},
});

async function uploadFileToS3(file: Buffer) {
	const fileBuffer = file;

	const uuid = uuidv4();
	const now = getFormatedDate({
		date: new Date(),
		format: 'YYYYMMDD_HH_mmss',
	});
	const uuidFileName = `${uuid}_${now}`;
	const encodedFileName = encodeURIComponent(uuidFileName);

	const params = {
		Bucket: 'moyang',
		Key: `images/${uuidFileName}`,
		Body: fileBuffer,
		ContentType: 'image',
	};

	const command = new PutObjectCommand(params);

	const result = await s3Client.send(command);

	return encodedFileName;
}

export default uploadFileToS3;
