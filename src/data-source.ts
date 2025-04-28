import { DataSource } from "typeorm";
import { Country } from "./entities/Country";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DATABASE_URL || "database.sqlite",
  entities: [Country],
  synchronize: true, 
  logging: false,
});