import 'reflect-metadata';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { buildSchema } from 'type-graphql';

import { dataSource } from './database/client';
import { CountryResolver } from './resolvers/country.resolver';
import { ContinentResolver } from './resolvers/continent.resolver';

async function main() {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [CountryResolver, ContinentResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server is running on ${url} 🧙`);
}

main()
    .catch(console.error);