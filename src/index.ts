import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { dataSource } from "./db/client";
import "dotenv/config";
import { CountryResolvers } from "./country/country.resolvers";
import { ContinentResolvers } from "./continent/continent.resolvers";

(async () => {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [CountryResolvers, ContinentResolvers],
    validate: true
  });

  const server = new ApolloServer({ schema });
  await startStandaloneServer(server, {
    listen: { port: +(process.env.SERVER_PORT || 4000) }
  });
})();