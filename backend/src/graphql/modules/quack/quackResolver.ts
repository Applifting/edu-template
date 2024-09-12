import { desc, eq } from 'drizzle-orm';
import { GraphQLError } from 'graphql/error';
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import { quack, user } from '../../../db/schema';
import { CustomContext } from '../../../types/types';
import { User } from '../user/userType';

import { Quack } from './quackType';

@Resolver(() => Quack)
export class QuackResolver {
  @Query(() => [Quack])
  async quacks(@Ctx() { db }: CustomContext): Promise<Quack[]> {
    return db.select().from(quack).orderBy(desc(quack.createdAt));
  }

  @Mutation(() => Quack)
  async addQuack(
    @Arg('text') text: string,
    @Ctx() { db, authUser }: CustomContext,
  ): Promise<Quack> {
    if (!authUser) {
      throw new GraphQLError('Unauthorized');
    }

    const createdAt = new Date();
    const returningIds = await db
      .insert(quack)
      .values({
        createdAt,
        userId: authUser.id,
        text,
      })
      .$returningId();
    const insertedQuack = (
      await db.select().from(quack).where(eq(quack.id, returningIds[0].id))
    )[0];
    return insertedQuack;
  }

  @Mutation(() => String)
  async deleteQuack(
    @Arg('quackId') quackId: number,
    @Ctx() { db }: CustomContext,
  ): Promise<string> {
    if (!quackId) {
      throw new GraphQLError('Missing quack ID or user ID.');
    }

    await db.delete(quack).where(eq(quack.id, quackId));

    return 'Quack deleted successfully';
  }

  @FieldResolver(() => User)
  async user(
    @Root() parent: Quack,
    @Ctx() { db }: CustomContext,
  ): Promise<User> {
    const userRecord = await db
      .select()
      .from(user)
      .where(eq(user.id, parent.userId));

    if (userRecord.length < 1) {
      throw new GraphQLError(`User with id=${parent.userId} not found.`);
    }

    return userRecord[0];
  }
}
