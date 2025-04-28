import { DataSource } from 'typeorm';

import 'dotenv/config';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'checkpoint',
  password: process.env.DB_PASSWORD || 'password-très-sécurisé',
  database: process.env.DB_DATABASE || 'checkpoint',
  entities: [],
  synchronize: true,
  logging: true,
});