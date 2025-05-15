import {
  ApolloServerPlugin,
  GraphQLRequestContextResponseForOperation,
  GraphQLRequestListener,
  GraphQLResponse,
  HeaderMap,
} from '@apollo/server';
import { addMocksToSchema } from '@graphql-tools/mock';
import { graphql } from 'graphql';

export class MocksApolloPlugin implements ApolloServerPlugin {
  private readonly resolvers: Record<string, any> | undefined;
  private readonly mocks: Record<string, any> | undefined;
  private readonly isEnabled: boolean;

  constructor({
    resolvers,
    mocks,
    isEnabled,
  }: {
    resolvers?: Record<string, any>;
    mocks?: Record<string, any>;
    isEnabled: boolean;
  }) {
    this.resolvers = resolvers;
    this.mocks = mocks;
    this.isEnabled = isEnabled;
  }

  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    const resolvers = this.resolvers;
    const mocks = this.mocks;
    const isEnabled = this.isEnabled;

    return {
      async responseForOperation(
        requestContext: GraphQLRequestContextResponseForOperation<any>,
      ): Promise<GraphQLResponse | null> {
        if (!isEnabled) {
          return null;
        }

        const mockedSchema = addMocksToSchema({
          schema: requestContext.schema,
          resolvers,
          mocks,
          preserveResolvers: false,
        });

        const result = await graphql({
          schema: mockedSchema,
          source: requestContext.source,
          variableValues: requestContext.request.variables,
        });

        return {
          body: { kind: 'single', singleResult: { data: result.data || {} } },
          http: { headers: new HeaderMap() },
        };
      },
    };
  }
}
