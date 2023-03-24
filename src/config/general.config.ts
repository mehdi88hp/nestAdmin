import { registerAs } from '@nestjs/config';


export default registerAs('general', () => ({
  auth: {
    cookieDomain: process.env.COOKIE_DOMAIN,
  }
}));
