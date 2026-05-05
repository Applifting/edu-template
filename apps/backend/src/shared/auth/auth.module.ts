import { ConfigModule } from '@applifting-io/nestjs-decorated-config';
import { Module } from '@nestjs/common';
import { MailModule } from 'src/core/email/mail.module';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { Config } from '../config/config.service';
import { betterAuthProvider } from './providers/better-auth.provider';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRootAsync(Config, { validate: true, printOnStartup: true }),
    MailModule,
  ],
  providers: [betterAuthProvider],
  exports: [betterAuthProvider],
})
export class AuthModule {}
