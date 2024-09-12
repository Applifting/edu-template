import * as argon2 from 'argon2';
import { desc, eq } from 'drizzle-orm';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import { GraphQLError } from 'graphql/error';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'graphql-upload/Upload.js';
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
import { createToken } from '../../../libs/jwt';
import { type CustomContext } from '../../../types/types';
import { getPublicStorageFilePath } from '../../../utils/helpers';
import { Quack } from '../quack/quackType';

import { AuthInfo, User } from './userType';

const FRONTEND_PROFILE_IMAGE_RELATIVE_PATH = 'uploads/profile-image';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(
    @Arg('userName') userName: string,
    @Ctx() { db }: CustomContext,
  ): Promise<User | null> {
    const userRecord = await db
      .select()
      .from(user)
      .where(eq(user.userName, userName));

    if (userRecord.length === 0) {
      return null;
    }

    return userRecord[0];
  }

  @Query(() => [User])
  async users(@Ctx() { db }: CustomContext): Promise<User[]> {
    return await db.select().from(user);
  }

  @Mutation(() => AuthInfo)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { db }: CustomContext,
  ): Promise<AuthInfo> {
    const userRecord = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (userRecord.length === 0) {
      throw new GraphQLError('Unauthorized.');
    }

    const foundUser = userRecord[0];
    if (await argon2.verify(foundUser.password, password)) {
      const token = createToken({ id: foundUser.id });

      return {
        user: { ...foundUser },
        token,
      };
    } else {
      throw new GraphQLError('Unauthorized.');
    }
  }

  @Mutation(() => AuthInfo)
  async signUp(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('name') name: string,
    @Arg('userName') userName: string,
    @Arg('profileImage', () => GraphQLUpload, { nullable: true })
    profileImageUploadObject: FileUpload,
    @Ctx() { db }: CustomContext,
  ): Promise<AuthInfo> {
    /* VALIDATION */

    const userByUserName = await db
      .select()
      .from(user)
      .where(eq(user.userName, userName));

    if (userByUserName.length > 0) {
      throw new GraphQLError('Username already taken');
    }

    const userByEmail = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (userByEmail.length > 0) {
      throw new GraphQLError('Email already registered');
    }

    /** PASSWORD HASHING */

    const passwordHash = await argon2.hash(password);

    /* IMAGE UPLOAD */

    let profileImageUrl: string | undefined = undefined;

    const profileImageFile = profileImageUploadObject;
    if (profileImageFile) {
      const { filename, createReadStream } = profileImageFile;
      const { fileDirectoryPath, filePath, relativeFileUrl } =
        getPublicStorageFilePath({
          filename,
          relativeDirectory: FRONTEND_PROFILE_IMAGE_RELATIVE_PATH,
        });

      await fsPromises.mkdir(fileDirectoryPath, { recursive: true });

      const stream = createReadStream();
      stream.pipe(fs.createWriteStream(filePath));

      profileImageUrl = relativeFileUrl;
    }

    /* DATABASE INSERT */

    const insertResult = await db
      .insert(user)
      .values({
        email,
        password: passwordHash,
        name,
        userName,
        profileImageUrl,
      })
      .$returningId();

    /* ASSEMBLE MUTATION RESPONSE */

    const id = insertResult[0].id;

    const token = createToken({ id });

    const userObject = {
      id,
      email,
      name,
      userName,
      profileImageUrl: profileImageUrl ?? null,
    };

    return { user: userObject, token: token };
  }

  @FieldResolver(() => [Quack])
  async quacks(
    @Root() parent: User,
    @Ctx() { db }: CustomContext,
  ): Promise<Quack[]> {
    return await db
      .select()
      .from(quack)
      .where(eq(quack.userId, parent.id))
      .orderBy(desc(quack.createdAt));
  }
}
