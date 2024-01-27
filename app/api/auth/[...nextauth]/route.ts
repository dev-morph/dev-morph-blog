// export { GET, POST } from '@/auth/auth';

import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'SignIn',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: {
					username: '유저이름',
					type: 'text',
					placeholder: '유저 이름 입력 요망',
				},
				password: { label: '비밀번호', type: 'password' },
			},

			async authorize(credentials, req) {
				const res = await fetch(`http://localhost:3000/api/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						username: credentials?.username,
						password: credentials?.password,
					}),
				});
				const user = await res.json();

				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
	],
	pages: {
		signIn: '/login',
	},
});

export { handler as GET, handler as POST };
