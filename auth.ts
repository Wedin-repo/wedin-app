import { getUserbyEmail, updateVerifiedOn } from '@/actions/data/user';
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
  pages: {
    signIn: '/login',
  },
  events: {
    async linkAccount({ user }) {
      if (!user.email) return;

      await updateVerifiedOn(user.email);
    },
  },
  callbacks: {
    async signIn({ user }) {
      if (!user || !user.email) return true;

      const existingUser = await getUserbyEmail(user.email);

      if (!existingUser || !existingUser.emailVerified) {
        return true;
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role;
        session.user.isOnboarded = token.isOnboarded;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token || !token.email) return token;

      const currentUser = await getUserbyEmail(token.email);

      if (!currentUser) return token;

      token.isOnboarded = currentUser.isOnboarded;

      if (!currentUser.role) return token;

      token.role = currentUser.role;

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
