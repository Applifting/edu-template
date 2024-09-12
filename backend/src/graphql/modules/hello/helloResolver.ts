import { Query, Resolver } from 'type-graphql';

import { formatDate } from '@shared/date';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  helloWorld(): string {
    return `Hello, World! ${formatDate(new Date())}`;
  }
}
