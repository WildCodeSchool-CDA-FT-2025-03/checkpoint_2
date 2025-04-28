import "reflect-metadata";
import { DataSource } from "typeorm";
import { Country } from "../entities/country.entities";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DATABASE_URL || "sqlite.db",
  synchronize: true, // En prod à mettre à false !!
  entities: [Country],
  logging: false,
});
