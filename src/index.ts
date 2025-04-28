import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./db/client";
import { CountryResolver } from "./resolvers/Country.resolver";
import { buildSchema } from "type-graphql";

(async () => {
  try {
    await dataSource.initialize();

    const schema = await buildSchema({
      resolvers: [CountryResolver],
    });

    const server = new ApolloServer({
      schema,
      includeStacktraceInErrorResponses: true
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 }
    });
    console.log(`🚀 Server started at ${url}`);

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();