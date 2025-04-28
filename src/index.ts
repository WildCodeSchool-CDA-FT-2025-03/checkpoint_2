import "dotenv/config";
import { dataSource } from "./services/client.service";
import { buildSchema } from "type-graphql";
import PaysResolver from "./resolvers/pays.resolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

(async () => {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [PaysResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server listen at : ${url}`);
})();
