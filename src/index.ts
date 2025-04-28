import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config";

import { dataSource } from "./database/db";

(async () => {
  await dataSource.initialize();

  const server = new ApolloServer({
    typeDefs: `
    type Query {
      hello: String
    }
  `,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.APOLLO_PORT) || 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
