import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Quack {
  @Field(() => ID)
  id!: number;

  @Field()
  createdAt!: Date;

  @Field()
  userId!: number;

  @Field()
  text!: string;
}
