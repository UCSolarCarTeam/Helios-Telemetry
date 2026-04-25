/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@shared/heliostypes"],
  reactCompiler: true,
  images: {
    qualities: [50, 75],
  },
};

export default nextConfig;
