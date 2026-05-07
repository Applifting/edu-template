import { User } from '../../users/domain/user';

export type Quack = {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
};
