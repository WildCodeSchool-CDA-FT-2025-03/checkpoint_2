/** Import des librairies */
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dataSource from "./db/client";
import { PaysResolver } from "./pays/pays.resolver";
import { buildSchema } from "type-graphql";

/** Fonction auto appellée (évite la mise en constante) permettant de lancer le serveur */

(async () => {
  await dataSource.initialize();

  // ajout du schema

  const schema = await buildSchema({
    resolvers: [PaysResolver],
  });

  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT as string) || 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
