import { DataSource } from "typeorm";
import { PaysEntity } from "../entities/pays.entity";
import { ContinentEntity } from "../entities/continents.entity";

const sync = process.env.DB_SYNC === "true" ? true : false;

export const dataSource = new DataSource({
  type: "sqlite",
  database: process.env.DB_SQLITE_PATH || "./db.sqlite",
  entities: [PaysEntity, ContinentEntity],
  synchronize: sync,
});
