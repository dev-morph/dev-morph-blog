import { DefaultUser, Session, DefaultSession } from 'next-auth';
import { DefaultJWT, JWT } from 'next-auth/jwt';

declare module 'next-auth' {
	interface Session {
		user: {
			role: string;
			username: string;
		} & DefaultSession['user'];
	}

	interface User extends DefaultUser {
		role: string;
		username: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		role: string;
		username: string;
	}
}
