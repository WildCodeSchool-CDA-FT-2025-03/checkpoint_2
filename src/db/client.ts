import { DataSource } from "typeorm";
import { Country } from "../entities/country.entity";

export const dataSource = new DataSource({
  entities: [Country],
  type: "sqlite", 
  database: "db.sqlite",
  synchronize: true
})

