import {
  datetime,
  int,
  mysqlTable,
  text,
  varchar,
} from 'drizzle-orm/mysql-core';

export const quack = mysqlTable('quack', {
  id: int('id').primaryKey().autoincrement(),
  createdAt: datetime('createdAt').notNull(),
  userId: int('userId').notNull(),
  text: text('text').notNull(),
});

export const user = mysqlTable('user', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  userName: varchar('userName', { length: 255 }).notNull(),
  profileImageUrl: varchar('profileImageUrl', { length: 255 }),
});
