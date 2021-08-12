import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import dotenv from 'dotenv';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

// load environment variables
dotenv.config();

const main = async () => {
  // database connection

  // graphql schema
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;
  // graphql resolvers
  const resolvers = {
    Query: {
      hello: () => 'World!',
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await apolloServer.start();

  const app = express();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, 'localhost', () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
    );
  });
};

main().catch((error) => console.log(error));
