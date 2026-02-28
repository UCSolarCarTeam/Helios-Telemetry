/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@shared/heliostypes"],
  reactCompiler: true,
};

export default nextConfig;
