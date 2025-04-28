import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dataSource from "./db/data-source"
import "dotenv/config";
import { buildSchema } from "type-graphql";
import { PaysResolver } from "./entites/pays.resolver";

(async () => {
    console.log("vous êtes connecté");
    await dataSource.initialize();

    const schema = await buildSchema({
        resolvers: [PaysResolver],
    });

    const server = new ApolloServer({ schema });
    await startStandaloneServer(server, {
        listen: { port: 5432 },
    });
})();