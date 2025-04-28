import { DataSource } from "typeorm";
import { Country } from "./entities/Country";
import * as dotenv from "dotenv";
import { Continent } from "./entities/Continent";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "db", // Le nom du service dans Docker Compose
  port: 5432,
  username: "user", // Utilisateur défini dans docker-compose.yml
  password: "password", // Mot de passe défini dans docker-compose.yml
  database: "mydatabase",
  entities: [Country, Continent],
  synchronize: true, 
  logging: false,
});