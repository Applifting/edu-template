import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { AuthModule } from 'src/shared/auth/auth.module';
import { Config } from 'src/shared/config/config.service';
import { PermissionsModule } from '../../shared/permissions/permissions.module';
import { QuackRepository } from './repositories/quack.repository';
import { QuacksController } from './rest/controllers/quacks.controller';
import { QuacksService } from './services/quacks.service';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    PermissionsModule,
    CacheModule.registerAsync({
      useFactory: (config: Config) => ({
        ttl: config.cacheTtlMs,
        max: config.cacheMaxItems,
      }),
      inject: [Config],
    }),
  ],
  controllers: [QuacksController],
  providers: [QuacksService, QuackRepository],
  exports: [QuacksService],
})
export class QuackModule {}
