/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

!process.env.SKIP_ENV_VALIDATION && (await import('./src/env.mjs'))

export default nextConfig
