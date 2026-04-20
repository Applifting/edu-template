import {
  Controller,
  Get,
  Header,
  Inject,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';
import { Config } from '../../../shared/config/config.service';
import { EmailService } from '../interfaces/email-service.interface';
import { renderEmail } from '../render';
import VerifyEmail from '../templates/verify-email';

class PreviewEmailQuery {
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: "Fill in if you want to send this preview email to this email address. If using basic resend account, you have to use the email address you registered with."
  })
  sendTo?: string;
}

/**
 * Dev-only endpoints for previewing and test-sending email templates.
 * Only for testing purposes in the beginning of development - this controller can be later deleted.
 */
@ApiTags('email-debug')
@Controller('email-debug')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class EmailDebugController {
  constructor(
    @Inject('EmailService') private readonly emailService: EmailService,
    private readonly config: Config,
  ) {}

  @Get('preview')
  @Header('Content-Type', 'text/html; charset=utf-8')
  @ApiOperation({
    summary: 'Render an email template as HTML (open in browser)',
  })
  async preview(@Query() query: PreviewEmailQuery): Promise<string> {
    const body = await renderEmail(VerifyEmail, {
      url: `${this.config.baseUrl}/api/auth/verify-email?token=example-token`,
    });
    if(query.sendTo) {
      await this.emailService.sendEmail(
      query.sendTo,
      'verify-email',
      body
    );
    }
    return body;
  }
}
