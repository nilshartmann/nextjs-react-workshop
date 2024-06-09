/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://nextjs.org/docs/app/api-reference/next-config-js/reactStrictMode
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    //    reactCompiler: true,
    staleTimes: {
      // https://nextjs.org/docs/app/api-reference/next-config-js/staleTimes
      dynamic: 30,
      static: 180,
    },
  },
};

export default nextConfig;
