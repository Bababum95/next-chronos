import type { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      apiKey?: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    apiKey?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    apiKey?: string;
  }
}