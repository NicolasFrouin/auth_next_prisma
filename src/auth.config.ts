import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';
import bcrypt from 'bcryptjs';
import { db } from './db';

export default {
  providers: [
    GitHub,
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = await bcrypt.hash(credentials.password as string, 10);

        let user = await db.user.findUnique({ where: { email } });
        console.log({ user });

        if (!user) {
          user = await db.user.create({ data: { email, password } });
        } else {
          const isValid = await bcrypt.compare(credentials.password as string, user.password as string);

          if (!isValid) {
            throw new Error('Invalid credentials');
          }
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
