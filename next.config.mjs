/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Several lockfiles exist above this directory; pin tracing to this project.
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
