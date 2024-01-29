import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

const s3Config = new S3Client({
	region: 'ap-northeast-2',
	credentials: {
		// accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
		// secretAccessKey: process.env.AWS_S3_SECRET_KEY as string,
		accessKeyId: 'AKIAWC6QFSBXXR4X7Q5U',
		secretAccessKey: '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',
	},
});

const upload = multer({
	storage: multerS3({
		s3: s3Config,
		bucket: 'moyang-blog',
		metadata(req, file, callback) {
			const uuid = uuidv4();
			const fileName = `${uuid}_${Date.now().toString()}`;
			console.log('file name is ', fileName);
			callback(null, `/images/${fileName}`);
		},
		key: function (req, file, cb) {
			console.log('triggered');
			cb(null, Date.now().toString());
		},
	}),
});

export default upload;
