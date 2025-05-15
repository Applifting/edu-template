import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description:
    'Event emitted when a new quack is created. Subscribe via the `quackCreated` subscription field',
})
export class QuackCreatedEventType {
  @Field({
    description: 'The id of the newly created quack',
    nullable: false,
  })
  quackId!: string;
}
