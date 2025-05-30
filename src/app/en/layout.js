import { Arimo } from "next/font/google";
import "../globals.css";
import { UserProvider } from "@/context/UserContext";

const arimo = Arimo({ subsets: ["latin"] });

export const metadata = {
  title: "Bidangil",
  description: "Shop Korean products easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={arimo.className}>
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
