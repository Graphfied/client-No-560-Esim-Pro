export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/esimInfo/:path*", "/profile/:path*", "/admin/:path*"],
};
