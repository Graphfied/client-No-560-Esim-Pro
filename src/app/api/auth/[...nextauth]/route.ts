import NextAuth from "next-auth/next";
import { authOptions } from "@/utils/AuthOptions";

const handler: any = NextAuth(authOptions);

export { handler as GET, handler as POST };
