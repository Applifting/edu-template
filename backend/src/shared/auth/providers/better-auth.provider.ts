import { Inject, Provider } from '@nestjs/common';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { EmailService } from '../../../core/email/interfaces/email-service.interface';
import { renderEmail } from '../../../core/email/render';
import { ResetPassword } from '../../../core/email/templates/reset-password';
import { VerifyEmail } from '../../../core/email/templates/verify-email';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { betterAuthCoreConfig } from '../../../shared/auth/config/better-auth.config';
import { Config } from '../../config/config.service';

const createAuth = (
  prismaService: PrismaService,
  config: Config,
  emailProvider: EmailService,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) =>
  betterAuth({
    database: prismaAdapter(prismaService, {
      provider: config.databaseProvider,
    }),
    emailAndPassword: {
      enabled: true,
      sendResetPassword: async ({ user, token }) => {
        const passwordResetUrl = `${config.frontendBaseUrl}/${config.frontendResetPasswordUrl}?token=${token}`;
        const html = await renderEmail(ResetPassword, {
          username: user.name,
          url: passwordResetUrl,
        });
        await emailProvider.sendEmail(user.email, 'Password reset', html);
      },
    },
    user: {
      additionalFields: {
        role: {
          type: 'string',
          required: true,
          defaultValue: 'user',
          input: false,
        },
      },
    },
    trustedOrigins: [config.frontendBaseUrl, config.frontendProdUrl],
    emailVerification: {
      sendVerificationEmail: async ({ user, url }) => {
        const html = await renderEmail(VerifyEmail, { url });
        await emailProvider.sendEmail(
          user.email,
          'Verify your email address',
          html,
        );
      },
      sendOnSignUp: true,
    },
    // If change (setup) affects database, must be in core config, in order to be able to run migrations
    ...betterAuthCoreConfig,
    plugins: [...(betterAuthCoreConfig.plugins ?? [])],
  });

export type BetterAuth = ReturnType<typeof createAuth>;

export const betterAuthProvider: Provider = {
  provide: 'BetterAuth',
  useFactory: (
    prismaService: PrismaService,
    config: Config,
    emailProvider: EmailService,
  ) => createAuth(prismaService, config, emailProvider),
  inject: [PrismaService, Config, 'EmailService'],
};

export const InjectBetterAuth = Inject('BetterAuth');
