import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { axiosPost } from "@/api";
import { cookies } from 'next/headers'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, req }) {
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
        token.account = account;
        token.error = "";
        token.cartId =""
        const cartId = cookies().get("cartId")?.value ?? "";
        console.log("cartId",cartId)
        console.log(cookies)
        try {
          var userObject = {
            mobile: "",
            fb_id: account.provider === "facebook" ? account.access_token : "",
            cart_id: cartId ? cartId : "",
            g_id: account.provider === "google" ? account.access_token : "",
            otp: "",
          }
          const response = await axiosPost("/User/LoginCheck", userObject);
          if (response.respObj) {

            token.userData = response.respObj;
            token.cartId = response.respObj.cart_id
          
          } else {
            token.error = "something went wrong while login";
          }
        } catch (error) {
          console.error("Error checking login:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.provider = token.provider;
      session.account = token.account;
      session.userData = token.userData;
      session.error = token.error;
      session.cartId = token.cartId
      return session;
    },
  },
  pages: {
    error: "/login",
  },
});

export { handler as GET, handler as POST };
