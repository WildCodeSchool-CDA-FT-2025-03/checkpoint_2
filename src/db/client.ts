import { DataSource } from "typeorm";
import "dotenv/config";
import { Country } from "../country/country.entities";
import { Continent } from "../continent/continent.entities";

export const dataSource = new DataSource({
  type: "sqlite", // Type de BDD recherchée (MySQL, PostGres, SQLite, ...)
  database: "./db.sqlite", // Prépférable de la mettre en .env
  entities: [Country, Continent], // On placera nos modèles de données ici
  synchronize: true, // Propriété de stratégie de synchronisation (ici, l'on synchronise à chaque fois que l'on lance le projet) ! Ne pas laisser en prod
});
export default dataSource;
