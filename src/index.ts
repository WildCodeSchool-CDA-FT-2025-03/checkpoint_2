import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { AppDataSource } from "./data/client";
import { CountryResolver } from "./resolvers/country.resolver";
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from "@apollo/server/standalone";

async function main() {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server is running on ${url} 🧙`);
}

main().catch(console.error);
