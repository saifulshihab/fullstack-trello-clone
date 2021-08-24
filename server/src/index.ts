import path from 'path';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import connectDB from './config/db';
import { COKKIE_NAME, __prod__ } from './constants';
import MyContext from './types';

declare module 'express-session' {
  interface SessionData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userId?: any;
  }
}

// load environment variables
dotenv.config();

const main = async () => {
  // database connection
  await connectDB();

  const app = express();

  // cors policy
  // app.options('*', cors());
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  const RedisStore = connectRedis(session);
  const redis = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: 6379,
  });

  // session
  app.use(
    session({
      name: COKKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: __prod__,
        sameSite: 'lax', // csrf
      },
      saveUninitialized: false,
      secret: 'tr7878wedj#ekjfelioe8llo',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [path.join(__dirname, './resolvers/*.js')],
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 8080;

  app.listen(PORT as number, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
};

main().catch((error) => console.log(error));
