import "dotenv/config";

import { Country } from "../entities/country.entity";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite", // type de ma db
  database: process.env.DB_NAME || "db.sqlite", // nom de ma db
  entities: [Country], // les entités de ma db
  synchronize: true, // synchroniser les entités avec la db
  logging: false,
  dropSchema: false,
  migrations: [],
  subscribers: [],
});
