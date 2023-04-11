import { registerAs } from '@nestjs/config';


export default registerAs('general', () => ({
  redisUri: process.env.REDIS_URI,
  auth: {
    cookieDomain: process.env.COOKIE_DOMAIN,
  },
  allowedCorsUrls: [
    process.env.ALLOWED_CORS_URL1,
  ],
}));
