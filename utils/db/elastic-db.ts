import { Client } from '@elastic/elasticsearch';
import fs from 'fs';

const elasticClient = new Client({
	node: 'https://localhost:9200',
	auth: {
		username: 'elastic',
		password: 'elasticmoyangblog',
	},
	tls: {
		ca: fs.readFileSync('./certs/es01/es01.crt'),
		rejectUnauthorized: false,
	},
});

// const elastic = globalThis.elastic ?? getClient();

export default elasticClient;

// if (process.env.NODE_ENV !== 'production') globalThis.elastic = elastic;
