import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import { GetSiteTitle } from "@/actions/getTitleKeys";

const rubik = Rubik({ subsets: ["latin"] });

async function Title() {
  const siteTitle: any = await GetSiteTitle();
  return siteTitle[0]?.title;
}

export async function generateMetadata(): Promise<Metadata> {
  const siteTitle: any = await GetSiteTitle();

  return {
    title: siteTitle[0]?.title,
    description: "eSIM Store",
  };
}

// export const metadata: Metadata = {
//   title: "MobiMatter",
//   description: "eSIM Store",
// };

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${rubik.className} bg-[#F2F6F8]`}>
        <Navbar />
        <Toaster />
        <div className="pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
