import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Identity } from 'src/shared/auth/domain/identity';
import { AbilityFactory } from 'src/shared/permissions/factory/ability.factory';
import { Quack } from '../domain/quack';
import { QuackRepository } from '../repositories/quack.repository';

@Injectable()
export class QuacksService {
  constructor(
    private readonly quackRepository: QuackRepository,
    private readonly abilityFactory: AbilityFactory,
  ) {}

  async getQuacks(): Promise<Quack[]> {
    return this.quackRepository.getQuacks();
  }

  async getQuacksByUserId(userId: string): Promise<Quack[]> {
    return this.quackRepository.getQuacksByUserId(userId);
  }

  async createQuack(
    user: Identity,
    quackData: { text: string },
  ): Promise<Quack> {
    return this.quackRepository.createQuack({
      text: quackData.text,
      userId: user.id,
    });
  }

  async deleteQuack(user: Identity, id: string): Promise<Quack | null> {
    const quack = await this.quackRepository.getById(id);

    if (!quack) {
      throw new NotFoundException();
    }

    const ability = this.abilityFactory.createForUser(user);

    if (!ability.canDeleteQuack(quack)) {
      throw new ForbiddenException();
    }

    return await this.quackRepository.delete(id);
  }
}
