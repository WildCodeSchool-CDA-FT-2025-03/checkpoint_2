import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Country } from "../entities/country.entity";
import { Continent } from "../entities/continent.entity";

dotenv.config();

export const dataSource = new DataSource({
  type: "sqlite",
  database: process.env.DB_PATH || "./db.sqlite",
  entities: [Country, Continent],
  synchronize: true,
});
