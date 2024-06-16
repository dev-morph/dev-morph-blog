module.exports = {
	apps: [
		{
			name: 'blog',
			script: './node_modules/.bin/next',
			args: 'start -p 3000',
			instances: 2,
			exec_mode: 'cluster',
		},
	],
};
