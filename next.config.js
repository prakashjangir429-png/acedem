/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.ACADEMY_PREVIEW_DIR || '.next',
  experimental: {
    // Native Windows file locking is unavailable in the managed preview environment.
    lockDistDir: !process.env.ACADEMY_PREVIEW_DIR,
  },
  images: { unoptimized: true },
  outputFileTracingIncludes: {
    '/*': ['./content/pages/**/*.json'],
  },
};

module.exports = nextConfig;
