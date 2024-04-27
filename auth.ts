import prisma from '@/db/client';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
// import Email from 'next-auth/providers/email';
import Facebook from 'next-auth/providers/facebook';
import Google from 'next-auth/providers/google';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    Facebook({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    // Email({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }

        console.log('credentials', credentials);

        console.log('email', credentials.email);

        let user = {};

        // const user = await prisma.user.findUnique({
        //   where: { email: credentials.email },
        // });

        // if (!user) {
        //   throw new Error('No user found with this email');
        // }
        //
        // if (!user.password) {
        //   throw new Error('No password set for this user');
        // }
        //
        // const isValid = bcrypt.compare(
        //   credentials.password,
        //   user.password
        // );
        //
        // if (!isValid) {
        //   throw new Error('Invalid password');
        // }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/register',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
