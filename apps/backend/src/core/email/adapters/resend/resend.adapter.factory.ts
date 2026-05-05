import { EmailService } from '../../interfaces/email-service.interface';
import { ResendConfig } from './interfaces/resend-config.interface';
import { ResendAdapter } from './services/resend-adapter';

export class ResendAdapterFactory {
  static create(config: ResendConfig): EmailService {
    return new ResendAdapter(config);
  }
}
