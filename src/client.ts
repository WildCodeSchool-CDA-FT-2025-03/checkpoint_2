import { DataSource } from "typeorm";
import { Country } from "./countries/country.entity";
import "dotenv/config";

const dataSource = new DataSource({
  type: "sqlite",
  database: process.env.DB_FILE,
  entities: [Country],
  synchronize: true,
  logging: true,
});

export default dataSource;
