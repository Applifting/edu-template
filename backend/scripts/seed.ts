import { getConnection } from '../src/db/db';
import { quack, user } from '../src/db/schema';

async function seed() {
  console.log('Starting seed function');
  const connection = await getConnection();
  const db = connection.db;
  console.log('Database connection established');

  try {
    if ((await db.select().from(user)).length === 0) {
      console.log('No users found, inserting sample users');
      await db.insert(user).values([
        {
          id: 1,
          name: 'Young Gatchell',
          email: 'yg123@quacker.cz',
          password: 'notHashedPassword1',
          userName: 'yg123',
          profileImageUrl: 'http://mrmrs.github.io/photos/p/1.jpg',
        },
        {
          id: 2,
          name: 'Gatchell Young',
          email: 'gyoung@quacker.cz',
          password: 'notHashedPassword2',
          userName: 'gyoung',
          profileImageUrl: 'http://mrmrs.github.io/photos/p/2.jpg',
        },
        {
          id: 3,
          name: 'Mitchel Old',
          email: 'oldmit@quacker.cz',
          password: 'notHashedPassword3',
          userName: 'oldmit',
          profileImageUrl: 'http://mrmrs.github.io/photos/p/3.jpg',
        },
      ]);
      console.log('Sample users inserted');

      console.log('Inserting sample quacks');
      await db.insert(quack).values([
        {
          id: 1,
          createdAt: new Date('2019-08-08T05:43:18.023Z'),
          userId: 1,
          text: 'Hello, People of the World!',
        },
        {
          id: 2,
          createdAt: new Date('2019-08-06T14:10:51.023Z'),
          userId: 2,
          text: 'Como setas?',
        },
        {
          id: 3,
          createdAt: new Date('2019-08-03T09:09:34.023Z'),
          userId: 3,
          text: 'Hello, People of the World! Hello, People of the World! Hello, People of the World! Hello, People of the World! Hello,\n\nWorld!',
        },
      ]);
      console.log('Sample quacks inserted');
    } else {
      console.log('Users already exist, skipping seed');
    }
    console.log('Seed function completed');
  } finally {
    await connection.connection.end();
  }
}

seed().catch((err) => {
  console.error('Error in seed function:', err);
  process.exit(1);
});
