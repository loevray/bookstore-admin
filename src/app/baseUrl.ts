export const BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
    : 'http://localhost:3000';
