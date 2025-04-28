import { DataSource } from "typeorm";
import "dotenv/config";
import { Country } from "../country/country.entities";
import { Continent } from "../continent/continent.entities";

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const dataSource = new DataSource({
  entities: [Country, Continent],
  type: "postgres",
  host: "db",
  port: 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true
});

export default dataSource;
