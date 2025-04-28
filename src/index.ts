import "reflect-metadata";

import { DataSource } from "typeorm";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

async function bootstrap() {
  try {
    // Configuration de la base de données
    const AppDataSource = new DataSource({
      type: "sqlite",
      database: "database.sqlite",
      synchronize: true,
      logging: true,
      entities: [],
      migrations: [],
      subscribers: [],
    });

    // Initialiser la connexion à la base de données
    await AppDataSource.initialize();
    console.log("Database connection initialized");
    console.log("🚀 Server ready");
  } catch (error) {
    console.error("Error during bootstrap:", error);
  }
}

bootstrap();
