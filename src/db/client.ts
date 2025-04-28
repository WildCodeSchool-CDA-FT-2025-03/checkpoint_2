import { DataSource } from "typeorm";
import { Pays } from "../pays/pays.entity";
import "dotenv/config";

const dataSource = new DataSource({
  type: "sqlite",
  database: process.env.DATABASE_URL || "./db.sqlite",
  entities: [Pays],
  logging: true,
  synchronize: true,
});

export default dataSource;
