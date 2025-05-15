import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { ConnectionArgs as ConnectionArgsInterface } from 'nestjs-graphql-connection';

@InputType()
export class ConnectionInput extends ConnectionArgsInterface {
  @Field(() => ID, { nullable: true })
  page?: number | null;

  @Field(() => String, { nullable: true })
  before?: string | null;

  @Field(() => String, { nullable: true })
  after?: string | null;

  @Field(() => Number, { nullable: true })
  first?: number | null;

  @Field(() => Number, { nullable: true })
  last?: number | null;
}

@ArgsType()
export class ConnectionArgs {
  @Field(() => ConnectionInput, { nullable: true, defaultValue: {} })
  pagination!: ConnectionInput;
}
