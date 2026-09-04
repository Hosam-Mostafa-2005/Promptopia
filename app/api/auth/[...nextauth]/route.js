import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "../../../../utils/database";
import User from "../../../../models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      await connectToDb();

      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDb();

        const userExists = await User.findOne({
          email: profile.email,
        });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s+/g, "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error("SIGNIN ERROR:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
