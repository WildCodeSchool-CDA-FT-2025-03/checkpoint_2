import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dataSource from "./db/data-source"
import "dotenv/config";

(async () => {
    console.log("vous êtes connecté");
    await dataSource.initialize();
});