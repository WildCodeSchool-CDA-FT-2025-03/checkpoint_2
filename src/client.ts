import { DataSource } from "typeorm";
import { Country } from "./countries/country.entity";
import "dotenv/config";
import { Continent } from "./continents/continents.entity";

// const dataSource = new DataSource({
//   type: "sqlite",
//   database: process.env.DB_FILE || "./db.sqlite",
//   entities: [Country, Continent],
//   synchronize: true,
// });

const dataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  synchronize: true,
  entities: [Continent, Country],
});

export default dataSource;

/**
 * - POSTGRES_PASSWORD=password
      - POSTGRES_USER=julien
      - POSTGRES_DB=checkpoint
 */
