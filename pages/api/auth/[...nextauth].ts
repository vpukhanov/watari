import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: "/auth/sign-up",
    verifyRequest: "/auth/email-sent",
  },
  theme: {
    colorScheme: "dark",
    brandColor: "#5bbfac",
    logo: "/images/logo_transparent.png",
  },
});