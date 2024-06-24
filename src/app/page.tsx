import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import MultiStepForm from '../components/forms/MultiStepForm';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home Application",
  description: "Your number one home rental application",
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow overflow-auto">
          <MultiStepForm />
        </main>
        <Footer />
      </body>
    </html>
  );
}
