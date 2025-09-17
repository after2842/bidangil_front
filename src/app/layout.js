import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import Script from "next/script";
import DesktopGuard from "@/components/ui/DesktopGuard";
export const metadata = {
  title: "비단길, 한국 쇼핑몰을 미국에서 받아보세요",
  description: "비단길, 한국 쇼핑몰을 미국에서 받아보세요.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDIYy1cEoJIzN4VacqPuC8pV66I1wjVzg&v=beta&libraries=places"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        {/* <DesktopGuard> */}
        <UserProvider>{children}</UserProvider>
        {/* </DesktopGuard> */}
      </body>
    </html>
  );
}
