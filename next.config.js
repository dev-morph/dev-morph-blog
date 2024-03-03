const {
	PHASE_PRODUCTION_SERVER,
	PHASE_DEVELOPMENT_SERVER,
} = require('next/constants');

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		return {
			images: {
				remotePatterns: [
					{
						protocol: 'https',
						hostname: 'moyang.s3.ap-northeast-2.amazonaws.com',
						port: '',
						pathname: '/images/**',
					},
					{
						protocol: 'https',
						hostname: 'img.shields.io',
						port: '',
						pathname: '/badge/**',
					},
				],
			},
			env: {
				mongodb_username: 'morph',
				mongodb_password: 'dlgudxo90',
				mongodb_clustername: 'cluster0',
				mongodb_database: 'my-site-dev',
			},
		};
	}
	return {
		images: {
			remotePatterns: [
				{
					protocol: 'https',
					hostname: 'moyang.s3.ap-northeast-2.amazonaws.com',
					port: '',
					pathname: '/images/**',
				},
				{
					protocol: 'https',
					hostname: 'img.shields.io',
					port: '',
					pathname: '/badge/**',
				},
			],
		},
		env: {
			mongodb_username: 'morph',
			mongodb_password: 'dlgudxo90',
			mongodb_clustername: 'cluster0',
			mongodb_database: 'my-site',
		},
	};
};

module.exports = nextConfig;
