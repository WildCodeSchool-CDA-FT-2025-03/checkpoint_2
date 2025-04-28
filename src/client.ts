import { DataSource } from "typeorm";
import { Country } from "./countries/country.entity";
import "dotenv/config";
import { Continent } from "./continents/continents.entity";

const dataSource = new DataSource({
  type: "sqlite",
  database: process.env.DB_FILE || "./db.sqlite",
  entities: [Country, Continent],
  synchronize: true,
});

export default dataSource;
