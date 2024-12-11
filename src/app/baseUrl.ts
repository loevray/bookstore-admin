export const BASE_URL = process.env.VERCEL_ENV
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
  : 'http://localhost:3000';
