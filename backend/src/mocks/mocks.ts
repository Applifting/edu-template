import { faker } from '@faker-js/faker';
import { IMockStore } from '@graphql-tools/mock';

import { formatDate } from '@shared/date';

faker.seed(42);

const randomDelay = async (max: number = 500, min: number = 50) =>
  await new Promise((resolve) =>
    setTimeout(resolve, faker.number.int({ min, max })),
  );

export const mockResolvers = (
  _store: IMockStore, // you can use this to implement pseudo-functionality (e.g. adding a quack)
) => {
  const generateRandomUser = (id: number) => ({
    id: `${id}`,
    userName: faker.internet.userName({ lastName: '' }),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    profileImageUrl: faker.image.urlPicsumPhotos({ width: 128 }),
  });

  const USERS = Array(4)
    .fill(null)
    .map((_, index) => generateRandomUser(index + 1));

  const CURRENT_USER = USERS[0];

  const generateRandomQuack = (id: number) => ({
    id: `${id}`,
    createdAt: faker.date.recent().toISOString(),
    text: faker.lorem.sentence(),
    userId: faker.helpers.arrayElement(USERS).id,
  });

  let QUACKS = Array(20)
    .fill(null)
    .map((_, index) => generateRandomQuack(index + 1))
    .reverse();

  return {
    Query: {
      helloWorld() {
        return `You are using GraphQL mocks. ${formatDate(new Date())}`;
      },
      async quacks() {
        await randomDelay();
        return QUACKS;
      },
      async user(_parent: unknown, args: { userName: string }) {
        await randomDelay();
        return USERS.find(({ userName }) => args.userName === userName) ?? null;
      },
      async users() {
        await randomDelay();
        return USERS;
      },
    },
    Mutation: {
      async addQuack(_parent: unknown, args: { text: string }) {
        await randomDelay(1500, 800);

        const newQuack = {
          id: `${Math.max(0, ...QUACKS.map(({ id }) => parseInt(id, 10))) + 1}`,
          text: args.text,
          userId: CURRENT_USER.id,
          createdAt: new Date().toISOString(),
        };

        QUACKS = [newQuack, ...QUACKS];

        return newQuack;
      },
      async deleteQuack() {
        await randomDelay();
        return 'Quack deleted successfully';
      },
      async signIn() {
        await randomDelay();
        return {
          user: CURRENT_USER,
          token: faker.string.alphanumeric(20),
        };
      },
      async signUp() {
        await randomDelay();
        return {
          user: CURRENT_USER,
          token: faker.string.alphanumeric(20),
        };
      },
    },
    User: {
      quacks: (parent: { id: string }) =>
        QUACKS.filter(({ userId }) => parent.id === userId),
    },
    Quack: {
      user: (parent: { userId: string }) =>
        USERS.find(({ id }) => parent.userId === id) ?? null,
    },
  };
};
