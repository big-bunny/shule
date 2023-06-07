import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';
import { NuxtAuthHandler } from '#auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const prisma = new PrismaClient();

const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.error('Error retrieving user by email:', error);
    return null;
  }
};

const getUserByUsername = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { username: username } });
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
      profile(profile: { id: any; name: any; email: any }) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
        };
      },
    }),
    FacebookProvider.default({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
 CredentialsProvider.default({
  name: 'Credentials',
  credentials: {
    username: { label: 'Username', type: 'text' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials: { username: any; password: any; }) {
    const { username, password } = credentials;

    // Hardcoded known user credentials
    const knownUser = {
      username: 'jsmith',
      password: 'hunter2',
      // Add other user properties if needed
    };

    if (username === knownUser.username && password === knownUser.password) {
      // Return the known user object if credentials match
      return knownUser;
    }

    return null;
  },
}),

  ],
});

export default authHandler;
