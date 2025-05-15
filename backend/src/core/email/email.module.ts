import { DynamicModule, Module, Provider } from '@nestjs/common';
import { EmailService } from './interfaces/email-service.interface';

@Module({})
export class EmailModule {
  static forRootAsync(options: {
    useFactory: (...args: any[]) => Promise<EmailService> | EmailService;
    inject: any[];
  }): DynamicModule {
    const emailProvider: Provider = {
      provide: 'EmailService',
      useFactory: options.useFactory,
      inject: options.inject,
    };

    return {
      module: EmailModule,
      providers: [emailProvider],
      exports: [emailProvider],
    };
  }
}
