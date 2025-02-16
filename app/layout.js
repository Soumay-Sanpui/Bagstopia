import "./globals.css";
import dbConnect from "@/utils/db";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Bagstopia",
  description: "Bagstopia is a platform for buying luxury bags",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  
  return (
    <html lang="en">
      <body className={`antialiased font-poppins overflow-x-hidden`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
