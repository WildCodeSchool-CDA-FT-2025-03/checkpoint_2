import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { AppDataSource } from "./data/client";
import { ContinentQueries } from "./resolvers/continent.queries";
import { ContinentResolver } from "./resolvers/continent.resolver";
import { CountryQueries } from "./resolvers/country.queries";
import { CountryResolver } from "./resolvers/country.resolver";
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from "@apollo/server/standalone";

async function main() {
  // Initialisation de la base de données
  await AppDataSource.initialize();

  // Construction du schéma GraphQL avec le resolver
  const schema = await buildSchema({
    resolvers: [
      CountryResolver,
      CountryQueries,
      ContinentResolver,
      ContinentQueries,
    ],
    validate: true, // Activation de la validation des données
  });

  // Création du serveur Apollo
  const server = new ApolloServer({
    schema,
  });

  // Démarrage du serveur
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server is running on ${url} 🧙`);
}

main().catch(console.error);
