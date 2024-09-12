import 'ts-node/register/transpile-only';
import 'tsconfig-paths/register';
import 'reflect-metadata';

import { ApolloServer } from '@apollo/server';
import {
  ExpressContextFunctionArgument,
  expressMiddleware,
} from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { addMocksToSchema } from '@graphql-tools/mock';
import cors from 'cors';
import { MySql2Database } from 'drizzle-orm/mysql2';
import express from 'express';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import * as http from 'http';
import { buildSchema } from 'type-graphql';

import { getConnection } from './db/db';
import { HelloResolver } from './graphql/modules/hello/helloResolver';
import { QuackResolver } from './graphql/modules/quack/quackResolver';
import { UserResolver } from './graphql/modules/user/userResolver';
import { parseAndVerifyJWT } from './libs/jwt';
import { mockResolvers } from './mocks/mocks';
import { CustomContext } from './types/types';
import { MOCKS, PORT } from './config';

const init = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [HelloResolver, UserResolver, QuackResolver],
    emitSchemaFile: true,
  });

  const server = new ApolloServer({
    schema: MOCKS
      ? addMocksToSchema({
          schema,
          resolvers: mockResolvers,
        })
      : schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  const drizzle = MOCKS ? null : await getConnection();

  const customContext = async ({
    req,
  }: ExpressContextFunctionArgument): Promise<CustomContext> => {
    const authToken = req.headers.authorization ?? '';
    const authUser = parseAndVerifyJWT(authToken);

    return {
      db: drizzle?.db as unknown as MySql2Database,
      authUser,
    };
  };

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(), // accepts all origins ('*'), not support cookies
    express.json(),
    graphqlUploadExpress(),
    expressMiddleware(server, {
      context: customContext,
    }),
  );

  app.get('/', (_req, res) => {
    res.redirect('/graphql');
  });

  httpServer.listen({ port: PORT }, () => {
    console.log('Server listening on port: ' + PORT);
  });
};

init();
