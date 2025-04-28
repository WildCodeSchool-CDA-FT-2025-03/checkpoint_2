import { DataSource } from "typeorm";
import { Pays } from "../entites/pays.entity";
import "dotenv/config";

const dataSource = new DataSource({
  entities: [Pays],
  type: "postgres",
  host: process.env.DB_HOST, // Nom du container en prod, souvent en variable d'environnement
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME, // Nom de l'utilisateur de DB, souvent en variable d'environnement
  password: process.env.DB_PASSWORD, // MOt de passe, toujours en variable d'environnement
  database: process.env.DB_NAME, // Nom de la base de donnée, souvent en variable d'environnement
  synchronize: true, // Désactivé en production (Possible de la mettre en variable d'env)
});

export default dataSource;