import { DefaultUser, Session, DefaultSession } from 'next-auth';
import { DefaultJWT, JWT } from 'next-auth/jwt';

declare module 'next-auth' {
	interface Session {
		user: {
			role_id: number;
			username: string;
		} & DefaultSession['user'];
	}

	interface User extends DefaultUser {
		role_id: number;
		username: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		role_id: number;
		username: string;
	}
}
