import Navbar from "@/components/nav";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
const inter = Inter({ subsets: ["latin"] });
import AuthOtpContext from "@/components/authContext";
export const metadata = {
  title: "Ribbons and Balloons",
  description:
    "Buy & Order Cakes Online and Send Cakes anywhere in Mumbai. Ribbons & Balloons is an Online Cakes Shop in Mumbai, we make your Occasions special for your friends, family and you. Order Best Quality cakes online and we deliver it on your doorsteps.",
  openGraph: {
    images: [
      {
        // url: "https://ribbonsandballoons.com/frontassets/images/fav.png",
        height: 1200,
        width: 600,
        alt: "Alt",
      },
    ],
    // icons: {
    //   icon: ["https://ribbonsandballoons.com/frontassets/images/fav.png"],
    //   shortcut: ["https://ribbonsandballoons.com/frontassets/images/fav.png"],
    // },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        ></link>
        <link rel="preconnect" href="https://static.cure.fit" />
        <link rel="preconnect" href="https://rnbapi.alphadigitall.com" />
        <link rel="preconnect" href="https://alphadigitall.com" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Merienda:wght@300..900&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet"></link>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <AuthOtpContext>
            <Navbar />
            {children}
            <Footer />
          </AuthOtpContext>
        </AuthProvider>
        <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
      </body>
    </html>
  );
}
