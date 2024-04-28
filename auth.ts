import { getUserbyEmail } from '@/actions/data/user';
import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import authOptions from './auth.config';

declare module 'next-auth' {
  interface Session {
    user: {
      isOnboarded: boolean;
      role: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    isOnboarded: boolean;
    role: string;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.isOnboarded && token.role) {
        session.user.role = token.role;
        session.user.isOnboarded = token.isOnboarded;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token || !token.email) return token;

      const user = await getUserbyEmail(token.email);

      if (!user || !user.isOnboarded) return token;

      token.isOnboarded = user.isOnboarded;

      if (!user.role) return token;

      token.role = user.role;
      return token;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  ...authOptions,
});
