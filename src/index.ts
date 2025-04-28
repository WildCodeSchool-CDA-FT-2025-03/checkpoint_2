import "reflect-metadata";
import * as dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data-source";
import { CountryResolver } from "./resolvers/CountryResolver";
import { ContinentResolver } from "./resolvers/ContinentResolver";


dotenv.config();

async function main() {
  await AppDataSource.initialize();
  console.log("📦 Database connected!");

  const schema = await buildSchema({
    resolvers: [CountryResolver, ContinentResolver],
    validate: true,
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT || "4000") },
  });

  console.log(`🚀 Server ready at: ${url}`);
}

main().catch((error) => {
  console.error(error);
});