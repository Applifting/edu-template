import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class OffsetInput {
  @Field(() => Number, { nullable: true })
  first?: number;

  @Field(() => Number, { nullable: true })
  offset?: number;
}

@ArgsType()
export class OffsetArgs {
  @Field(() => OffsetInput, { nullable: true, defaultValue: {} })
  pagination!: OffsetInput;
}
