import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from 'next/headers'

const handler = NextAuth({
  providers: [

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
        const apiUrl = process.env.API_URL
        try {
          var userObject = {
            mobile: "",
            fb_id: account.provider === "facebook" ? account.access_token : "",
            cart_id: cartId ? cartId : "",
            g_id: account.provider === "google" ? account.access_token : "",
            otp: "",
          };
        
          const response = await fetch(apiUrl+"User/LoginCheck", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userObject),
          });
        
          if (response.ok) {
            const responseData = await response.json();
            if (responseData.respObj) {
              token.userData = responseData.respObj;
              token.cartId = responseData.respObj.cart_id;
            } else {
              token.error = "something went wrong while login";
            }
          } else {
            throw new Error("Network response was not ok.");
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
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
  pages: {
    error: "/login",
  },
});

export { handler as GET, handler as POST };
