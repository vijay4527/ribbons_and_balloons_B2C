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
    "Welcome to Gamewitted, your ultimate destination for immersive gaming and captivating anime content! Dive into a world where pixels meet passion, as we bring you the latest updates, reviews, and insights from the gaming and anime realms.",
  openGraph: {
    images: [
      {
        url: "https://ribbonsandballoons.com/frontassets/images/fav.png",
        height: 1200,
        width: 600,
        alt: "Alt",
      },
    ],
    icons: {
      icon: ["https://ribbonsandballoons.com/frontassets/images/fav.png"],
      shortcut: ["https://ribbonsandballoons.com/frontassets/images/fav.png"],
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://ribbonsandballoons.com/frontassets/images/fav.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://ribbonsandballoons.com/frontassets/images/fav.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="194x194"
          href="https://ribbonsandballoons.com/frontassets/images/fav.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="https://ribbonsandballoons.com/frontassets/images/fav.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="manifest"
          href="https://ribbonsandballoons.com/frontassets/images/fav.png"
        />
        <link
          rel="mask-icon"
          href="https://ribbonsandballoons.com/frontassets/images/fav.png"
          color="#000000"
        />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/js/bootstrap.bundle.min.js"></script>

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Agbalumo&family=Handjet&family=Kenia&family=Nabla&family=Poppins:ital,wght@1,700&family=Whisper&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant&display=swap"
        />
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <AuthOtpContext>
            <Navbar />
            {children}
            <Footer />
          </AuthOtpContext>

        </AuthProvider>
      </body>
    </html>
  );
}
