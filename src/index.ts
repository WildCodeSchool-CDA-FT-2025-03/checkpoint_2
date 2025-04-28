import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import "dotenv/config";

import { dataSource } from "./database/client";

import CountryResolver from "./resolvers/country.resolver";
import ContinentResolver from "./resolvers/continent.resolver";

(async () => {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [CountryResolver, ContinentResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.APOLLO_PORT) || 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
