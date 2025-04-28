import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Country } from "../entities/country.entity";

dotenv.config();

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  entities: [Country],
  synchronize: true,
});
