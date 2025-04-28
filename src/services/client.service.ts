import { DataSource } from "typeorm";
import { PaysEntity } from "../entities/pays.entity";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  entities: [PaysEntity],
  synchronize: true,
});
