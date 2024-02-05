/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mobimatterstorage.blob.core.windows.net",
      },
      // { protocol: "https", hostname: "media.istockphoto.com" },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  // typescript : {
  //   ignoreBuildErrors : true
  // }
};

module.exports = nextConfig;
