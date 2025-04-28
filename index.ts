import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { AppDataSource } from "./src/data/client";
import { CountryResolver } from "./src/resolvers/country.resolver";
import { buildSchema } from "type-graphql";
import { config } from "dotenv";
import { startStandaloneServer } from "@apollo/server/standalone";

// Chargement des variables d'environnement
config();

// Initialisation de la base de données
AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    // Construction du schéma GraphQL
    const schema = await buildSchema({
      resolvers: [CountryResolver],
      validate: true,
    });

    // Création du serveur Apollo
    const server = new ApolloServer({
      schema,
    });

    // Démarrage du serveur
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: async ({ req, res }) => {
        return {
          req,
          res,
        };
      },
    });

    console.log(`🚀 Server ready at ${url}`);
  })
  .catch((error) => {
    console.error("Error during server initialization:", error);
    process.exit(1);
  });
