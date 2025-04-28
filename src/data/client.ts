import "dotenv/config";

import { Continent } from "../entities/continent.entity";
import { Country } from "../entities/country.entity";
import { DataSource } from "typeorm";

// Configuration de la connexion à SQLite
// La base de données est vierge au démarrage
// Les données seront ajoutées via les mutations GraphQL
export const AppDataSource = new DataSource({
  type: "sqlite", // type de ma db
  database: process.env.DB_NAME || "db.sqlite", // nom de ma db
  entities: [Country, Continent], // les entités de ma db
  synchronize: true, // synchroniser les entités avec la db
  logging: false,
  dropSchema: false,
  migrations: [],
  subscribers: [],
});
