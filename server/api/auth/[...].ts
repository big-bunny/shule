import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { NuxtAuthHandler } from '#auth';
const prisma = new PrismaClient();

const getUserByEmail = async (email: any) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.error('Error retrieving user by email:', error);
    return null;
  }
};

const getUserByUsername = async (username: any) => {
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    return user;
  } catch (error) {
    console.error('Error retrieving user by username:', error);
    return null;
  }
};

const authHandler = NuxtAuthHandler({
  secret: process.env.NUXT_SECRET,
  providers: [
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile(profile: { id: any; name: any; email: any; }) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
        };
      },
    }),
    FacebookProvider.default({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    CredentialsProvider.default({
      id: "domain-login",
      name: "Domain Account",
      async authorize(credentials: { domain: any; username: any; password: any; }, req: any) {
        const { domain, username, password } = credentials;
        const user = await getUserByUsername(username);

        if (!user || user.domain !== domain || user.password !== password) {
          return null; // Authentication failed
        }

        return user; // Authentication successful
      },
      credentials: {
        domain: {
          label: "Domain",
          type: "text",
          placeholder: "CORPNET",
          value: "CORPNET",
        },
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
    }),
    CredentialsProvider.default({
      id: "intranet-credentials",
      name: "Two Factor Auth",
      async authorize(credentials: { email: any; "2fa-key": any; }, req: any) {
        const { email, "2fa-key": twoFactorKey } = credentials;
        const user = await getUserByEmail(email);

        if (!user || user.twoFactorKey !== twoFactorKey) {
          return null; // Authentication failed
        }

        return user; // Authentication successful
      },
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        "2fa-key": { label: "2FA Key" },
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});

export default authHandler;
