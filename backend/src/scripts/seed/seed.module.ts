import { ConfigModule } from '@applifting-io/nestjs-decorated-config';
import { Module } from '@nestjs/common';
import { EmailModule } from '../../core/email/email.module';
import { PrismaService } from '../../core/prisma/prisma.service';
import { betterAuthProvider } from '../../shared/auth/providers/better-auth.provider';
import { Config } from '../../shared/config/config.service';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { ConsoleMailerAdapterFactory } from 'src/core/email/adapters/console-mailer/console-mailer.adapter.factory';

@Module({
  imports: [
    ConfigModule.forRootAsync(Config, { validate: true, printOnStartup: true }),
    EmailModule.forRootAsync({
      useFactory: async () => {
        return ConsoleMailerAdapterFactory.create();
      },
      inject: [Config],
    }),
  ],
  providers: [Config, PrismaService, betterAuthProvider, SeedService],
  controllers: [SeedController],
})
export class SeedModule {}
