import { registerAs } from '@nestjs/config';

export interface MongoDatabaseConfig {
  uri: string;
  user: string;
  password: string;
  database: string;
}

export default registerAs('database', () => ({
  mongo: {
    uri: process.env.MONGO_DB_URI,
    user: process.env.MONGO_DB_USER,
    password: process.env.MONGO_DB_PASSWORD,
    database: process.env.MONGO_DB_DATABASE,
  }
}));
