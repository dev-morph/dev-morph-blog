import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

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
	const now = dayjs().format('YYYYMMDD_HH_mmss')
	const uuidFileName = `${uuid}_${now}`;

	const params = {
		Bucket: 'moyang',
		Key: `images/${uuidFileName}`,
		Body: fileBuffer,
		ContentType: "image",
	}

	const command = new PutObjectCommand(params);

	await s3Client.send(command);

	return uuidFileName;
}

export default uploadFileToS3;
