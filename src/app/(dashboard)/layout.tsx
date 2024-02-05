import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import ".././globals.css";
import { Sidebar, SidebarSkeleton } from "./_components/Sidebar";
import { Container } from "./_components/Container";
import { Suspense } from "react";
import { Toaster } from "sonner";
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

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${rubik.className}`}>
        <div className="flex min-h-full bg-blue-800">
          <Toaster />
          <Suspense fallback={<SidebarSkeleton />}>
            <Sidebar />
          </Suspense>
          <Container>{children}</Container>
        </div>
      </body>
    </html>
  );
}
