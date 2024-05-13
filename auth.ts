import { getUserByEmail, updateVerifiedOn } from '@/actions/data/user';
import NextAuth, { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import authOptions from './auth.config';

export type ErrorResponse = {
  error: string;
};

export function isError(response: unknown): response is ErrorResponse {
  return (response as ErrorResponse).error !== undefined;
}

declare module 'next-auth' {
  interface Session {
    user: {
      isOnboarded: boolean;
      role?: string;
      isExistingUser?: boolean;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    isOnboarded: boolean;
    role: string;
    isExistingUser?: boolean;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '(auth)/login',
    error: '(auth)/error',
  },
  events: {
    async linkAccount({ user }) {
      if (!user.email) return;

      await updateVerifiedOn(user.email);
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user || !user.email) return false;

      if (account && account.type !== 'credentials') return true;

      // const existingUser = await getUserbyEmail(user.email);
      //
      // if (!existingUser || !existingUser.emailVerified) {
      //   return true;
      // }

      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.isExistingUser = token.isExistingUser;
        session.user.role = token.role;
        session.user.isOnboarded = token.isOnboarded;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token || !token.email) return token;

      const response = await getUserByEmail(token.email);

      if (isError(response)) {
        switch (response.error) {
          case 'User not found':
            token.isExistingUser = false;
            break;
          default:
            // You might decide to leave isExistingUser unchanged if it's an internal error
            return token;
        }
        return token;
      }

      token.name = response.name;
      token.isOnboarded = response.isOnboarded;
      token.role = response.role;
      token.isExistingUser = true;

      return token;
    },
  },
  // debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  ...authOptions,
});
