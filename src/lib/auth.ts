import NextAuth from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// NextAuth v5 (Auth.js). Magic-link sign-in via email (Nodemailer provider),
// backed by the Prisma adapter (uses the VerificationToken + User tables).
// AUTH_SECRET / AUTH_URL are read from the environment automatically; they are
// also aliased to NEXTAUTH_SECRET / NEXTAUTH_URL for back-compat.
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // Required when running behind the Cloudflare tunnel / Coolify proxy.
  trustHost: true,
  providers: [
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT ?? 465),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    // Framework-initiated sign-in lands on our own styled page.
    signIn: "/rsvp",
    // Our own "check your email" screen (warns about the junk folder)
    // instead of the unstyled Auth.js default.
    verifyRequest: "/check-email",
  },
});
