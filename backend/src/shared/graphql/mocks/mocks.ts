import { faker } from '@faker-js/faker';

/**
 * Generate a random length list of items
 * @param generatorFunction Function to generate a single item
 * @param maxLength Maximum length of the list
 * @returns List of random items
 */
const generateRandomList = <T>(
  generatorFunction: () => T,
  maxLength: number = 5,
) => {
  return faker.helpers.multiple(() => generatorFunction(), {
    count: { min: 0, max: maxLength },
  });
};

/**
 * Await this to generate a random response delay in mocks (to force handling of loading states)
 * @param maxDelayMs Maximum delay in milliseconds
 */
const randomDelay = async (maxDelayMs: number = 1000) =>
  await new Promise((resolve) =>
    setTimeout(resolve, faker.number.int(maxDelayMs)),
  );

/**
 * Generates a random user object.
 * @returns An object representing a user with id, name, email, and role.
 */
const generateRandomUser = () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  userName: faker.internet.userName(),
  profileImageUrl: faker.image.avatar(),
  role: faker.helpers.arrayElement(['user', 'admin']),
});

/**
 * Generates a random file object.
 * @returns An object representing a file with metadata such as name, bucket name, key, MIME type, size, URL, and timestamps.
 */
const generateRandomFile = () => ({
  id: faker.string.uuid(),
  name: faker.system.fileName(),
  bucketName: faker.internet.domainName(),
  key: faker.string.alphanumeric(10),
  mimeType: faker.system.mimeType(),
  sizeBytes: faker.number.int({ min: 1024, max: 5 * 1024 * 1024 }),
  fileDownloadUrl: faker.internet.url(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
});

/**
 * Generates a random quack object.
 * @returns An object representing a quack with id, text, timestamps, and user.
 */
const generateRandomQuack = () => ({
  id: faker.string.uuid(),
  text: faker.lorem.paragraph(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  userId: faker.string.uuid(),
  user: generateRandomUser(),
});

/**
 * Generates a random pagination info object.
 * @returns An object representing pagination info with next/previous page indicators, cursors, and total edges.
 */
const generateRandomPageInfo = () => ({
  hasNextPage: faker.datatype.boolean(),
  hasPreviousPage: faker.datatype.boolean(),
  startCursor: faker.string.alphanumeric(10),
  endCursor: faker.string.alphanumeric(10),
  totalEdges: faker.number.int({ min: 1, max: 50 }),
});

export const mockResolvers = () => ({
  DateTime: {
    __serialize: (value: string) => value,
  },
  QuackType: {
    async user() {
      return generateRandomUser();
    },
  },
  Query: {
    async file() {
      await randomDelay();
      return generateRandomFile();
    },
    async fileDownloadUrl() {
      await randomDelay();
      return faker.internet.url();
    },
    async isUp() {
      await randomDelay();
      return true;
    },
    async me() {
      await randomDelay();
      return generateRandomUser();
    },
    async paginatedQuacks() {
      await randomDelay();
      return {
        nodes: generateRandomList(generateRandomQuack, 10),
        hasNext: faker.datatype.boolean(),
        hasPrevious: faker.datatype.boolean(),
        totalCount: faker.number.int({ min: 1, max: 100 }),
      };
    },
    async paginatedUsers() {
      await randomDelay();
      return {
        nodes: generateRandomList(generateRandomUser, 10),
        hasNext: faker.datatype.boolean(),
        hasPrevious: faker.datatype.boolean(),
        totalCount: faker.number.int({ min: 1, max: 100 }),
      };
    },
    async quacks() {
      await randomDelay();
      return generateRandomList(generateRandomQuack, 10);
    },
    async quacksConnection() {
      await randomDelay();
      const quacks = generateRandomList(generateRandomQuack, 10);
      return {
        edges: quacks.map((quack) => ({
          node: quack,
          cursor: faker.string.alphanumeric(10),
        })),
        pageInfo: generateRandomPageInfo(),
      };
    },
    async user() {
      await randomDelay();
      return generateRandomUser();
    },
  },
  Mutation: {
    async createFile(_, { createFileInput }) {
      await randomDelay();
      return { ...generateRandomFile(), ...createFileInput };
    },
    async addQuack(_, { text }) {
      await randomDelay();
      return { ...generateRandomQuack(), text };
    },
    async deleteFile() {
      await randomDelay();
      return generateRandomFile();
    },
    async deleteQuack() {
      await randomDelay();
      return 'Quack deleted successfully';
    },
    async deleteUser() {
      await randomDelay();
      return generateRandomUser();
    },
    async generateFileUploadUrl() {
      return faker.internet.url();
    },
    async throwBadRequestError() {
      throw new Error('Bad Request');
    },
    async throwInternalError() {
      throw new Error('Internal Server Error');
    },
    async updateUser(_, { data }) {
      await randomDelay();
      return { ...generateRandomUser(), ...data };
    },
  },
  Subscription: {
    quackCreated: {
      subscribe: () => ({
        quackId: faker.string.uuid(),
      }),
    },
  },
});
