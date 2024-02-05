import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import ".././globals.css";
import { GetSiteTitle } from "@/actions/getTitleKeys";

const rubik = Rubik({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "MobiMatter",
//   description: "eSIM Store",
// };
export async function generateMetadata(): Promise<Metadata> {
  const siteTitle: any = await GetSiteTitle();

  return {
    title: siteTitle[0]?.title,
    description: "eSIM Store",
  };
}

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${rubik.className} bg-[#F2F6F8]`}>{children}</body>
    </html>
  );
}
