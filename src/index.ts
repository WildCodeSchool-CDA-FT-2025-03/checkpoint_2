import "reflect-metadata";
import { buildSchema } from "type-graphql";
import dataSource from "./client";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import CountryResolver from "./countries/country.resolvers";

(async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [CountryResolver],
    validate: true,
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 4000,
    },
  });

  console.info(`You rserver is running on ${url}`);
})();
