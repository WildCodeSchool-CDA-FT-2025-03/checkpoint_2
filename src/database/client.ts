import { DataSource } from 'typeorm';

import { Country } from '../entities/country.entity';
import { Continent } from '../entities/continent.entity';

import 'dotenv/config';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'checkpoint',
  password: process.env.DB_PASSWORD || 'password-très-sécurisé',
  database: process.env.DB_DATABASE || 'checkpoint',
  entities: [Country, Continent],
  synchronize: true,
  logging: true,
});