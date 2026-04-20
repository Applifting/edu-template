import { Global, Module } from '@nestjs/common';
import { Config } from '../../shared/config/config.service';
import { EmailModule } from './email.module';
import { EmailDebugController } from './controllers/email-debug.controller';
import { ResendAdapterFactory } from './adapters/resend/resend.adapter.factory';
import { SMTPAdapterFactory } from './adapters/smtp/smtp.adapter.factory';
import { ConsoleMailerAdapterFactory } from './adapters/console-mailer/console-mailer.adapter.factory';

/**
 * Picks an email adapter based on env:
 *   RESEND_API_KEY set           → Resend
 *   SMTP_HOST + USERNAME + PASS  → SMTP
 *   otherwise                    → Console (logs emails to stdout, dev only)
 *
 * Import this module whenever you need to inject `'EmailService'`.
 * The single shared `EmailService` instance is provided here so every
 * consumer (auth flows, debug endpoints, …) uses the same transport.
 */
@Global()
@Module({
  imports: [
    EmailModule.forRootAsync({
      useFactory: async (...args: unknown[]) => {
        const config = args[0] as Config;
        if (config.resendApiKey) {
          return ResendAdapterFactory.create({
            apiKey: config.resendApiKey,
            from: config.emailFrom,
          });
        }
        if (config.smtpHost && config.smtpUsername && config.smtpPassword) {
          return SMTPAdapterFactory.create({
            host: config.smtpHost,
            port: config.smtpPort,
            secure: config.smtpSecure,
            user: config.smtpUsername,
            pass: config.smtpPassword,
          });
        }
        return ConsoleMailerAdapterFactory.create();
      },
      inject: [Config],
    }),
  ],
  controllers: [EmailDebugController],
  exports: [EmailModule],
})
export class MailModule {}
