import { DataSource } from "typeorm";
import { Country } from "./entities/Country";
import * as dotenv from "dotenv";
import { Continent } from "./entities/Continent";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DATABASE_URL || "database.sqlite",
  entities: [Country, Continent],
  synchronize: true, 
  logging: false,
});