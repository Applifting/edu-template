import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginatedResult {
  @Field(() => Boolean)
  hasNext!: boolean;

  @Field(() => Boolean)
  hasPrevious!: boolean;

  @Field(() => Number)
  totalCount!: number;
}
