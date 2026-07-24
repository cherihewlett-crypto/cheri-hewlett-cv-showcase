/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Several lockfiles exist above this directory; pin tracing to this project.
  outputFileTracingRoot: import.meta.dirname,

  // Vercel stamps X-Robots-Tag: noindex on *.vercel.app deployment URLs, which
  // silently keeps the page out of search results. This asks for the opposite.
  // NOTE: the platform header may still win on the .vercel.app hostname — a
  // custom domain is the reliable fix, and this config is what makes the domain
  // work the moment it is attached.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'index, follow' }],
      },
    ];
  },
};

export default nextConfig;
