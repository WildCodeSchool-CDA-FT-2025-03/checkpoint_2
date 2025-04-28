/** Import des librairies */
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dataSource from "./db/client";

const typeDefs = `
  type Query {
    hello: String
  }
`;

// Définissez vos résolveurs ici
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

// instance provisoire d'ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

/** Fonction auto appellée (évite la mise en constante) permettant de lancer le serveur */
(async () => {
  await dataSource.initialize();
  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT as string) || 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
