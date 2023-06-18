import { NuxtAuthHandler } from '#auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  // Configure the transporter with your email service provider details
  service: 'SMTP',
  auth: {
    user: 'codecenter000@@gmail.com',
    pass: '0110883547Kim',
  },
});

// Create an instance of NuxtAuthHandler
const authHandler = NuxtAuthHandler({
  secret: process.env.NUXT_SECRET,

  // Configure the authentication providers
  providers: [
    // GitHub authentication provider
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // Google authentication provider
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
    // Facebook authentication provider
    FacebookProvider.default({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    // ...
    // Credentials authentication provider
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        registrationUsername: { label: 'Email', type: 'text' },
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: { username: any; password: any; registrationUsername: any }) {
        const { username, password, registrationUsername } = credentials;

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: username },
        });

        if (!existingUser) {
          // Generate a random authentication key
          const authenticationKey = crypto.randomBytes(16).toString('hex');

          // Create a new user if it doesn't exist
          const newUser = await prisma.user.create({
            data: {
              email: username,
              password: password,
              authentication_key: authenticationKey,
              id_: 1, // Provide a unique ID for the user
              username: registrationUsername, // Use the entered username
              // Add any additional fields for the user
            },
          });

          // Send the welcome email to the new user
          await transporter.sendMail({
            from: 'your_email',
            to: newUser.email,
            subject: 'Welcome to Schield Centre friends forum',
            text: 'Thank you for signing up with us today. This is our official email. Feel free to reach out to support through this email!',
          });

          // Return the newly created user object
          return newUser;
        } else if (existingUser.password === password) {
          // Return the user object if the credentials match
          return existingUser;
        }

        return null;
      },
    }),

    // ...
  ],
});

export default authHandler;
