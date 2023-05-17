import GitHubProvider from "next-auth/providers/github";
import NextAuth from "next-auth/next";
import { findUserByEmail, newUser, userExists } from "@/model/user.model";

const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ profile }) {
            try {
                const userExist = await userExists(profile.id);
                if (!userExist) {
                    await newUser(
                        profile.id,
                        profile.login,
                        profile.email,
                        profile.avatar_url
                    );
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },

        async session({ session }) {
            try {
                const user = await findUserByEmail(session.user.email);
                session.user.id = user.id.toString();
            } catch (error) {
                console.log(error);
            }

            return session;
        },
    },
});

export { handler as GET, handler as POST };
