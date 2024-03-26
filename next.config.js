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
	};
};

module.exports = nextConfig;
