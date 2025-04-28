import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import dotenv from "dotenv";
import { AppDataSource } from "./config/dataSource";
import { PingResolver } from "./resolvers/ping.resolver";

dotenv.config();

async function main() {
  await AppDataSource.initialize()
    .then(() => console.log("📦 Database connected successfully"))
    .catch((err) => console.error("❌ Database connection error:", err));

  const schema = await buildSchema({
    resolvers: [PingResolver],
    validate: false,
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) || 4000 },
  });

  console.log(`🚀 Server ready at: ${url}`);
}

main().catch((error) => {
  console.error("Error starting server:", error);
});
