import { Injectable } from '@nestjs/common';
import { Quack } from 'src/modules/quack/domain/quack';
import { User, UserRoleEnum } from 'src/modules/users/domain/user';
import { Identity } from 'src/shared/auth/domain/identity';

// simplified ability factory
// only offers basic permissions/checks with basic implementation
// for more robust solution check CASL library integration for NestJS
// its' better to keep your abilities/permissions in one place rather than having them all over the application

export interface AppAbility {
  canAddQuack(): boolean;
  canReadQuacks(): boolean;
  canDeleteQuack(quack: Quack): boolean;
  canCreateUser(): boolean;
  canReadUsers(): boolean;
  canUpdateUser(user: User): boolean;
  canDeleteUser(user: User): boolean;
}

@Injectable()
export class AbilityFactory {
  createForUser(user: Identity): AppAbility {
    const isAdmin = user.role === UserRoleEnum.admin;

    return {
      canAddQuack: () => true,
      canReadQuacks: () => true,
      canDeleteQuack: (quack) => {
        return quack.userId === user.id || isAdmin;
      },
      canCreateUser: () => isAdmin,
      canReadUsers: () => true,
      canUpdateUser: (userToUpdate) => {
        return userToUpdate.id === user.id || isAdmin;
      },
      canDeleteUser: (userToDelete) => {
        return userToDelete.id === user.id || isAdmin;
      },
    };
  }
}
