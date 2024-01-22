const {
	PHASE_PRODUCTION_SERVER,
	PHASE_DEVELOPMENT_SERVER,
} = require('next/constants');

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		return {
			env: {
				mongodb_username: 'morph',
				mongodb_password: 'dlgudxo90',
				mongodb_clustername: 'cluster0',
				mongodb_database: 'my-site-dev',
			},
		};
	}
	return {
		env: {
			mongodb_username: 'morph',
			mongodb_password: 'dlgudxo90',
			mongodb_clustername: 'cluster0',
			mongodb_database: 'my-site',
		},
	};
};

module.exports = nextConfig;
