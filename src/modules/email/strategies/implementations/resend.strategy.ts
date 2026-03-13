import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { SendEmailDto } from '../../dtos/send-email.dto';
import { EmailStrategy } from '../email.strategy';
import { RESEND_CLIENT } from './resend.provider';

@Injectable()
export class ResendStrategy extends EmailStrategy {
  private readonly logger = new Logger(ResendStrategy.name);

  constructor(
    @Inject(RESEND_CLIENT) private readonly resend: Resend,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  public async send(dto: SendEmailDto): Promise<boolean> {
    const { error } = await this.resend.emails.send({
      from: this.configService.getOrThrow<string>('RESEND_FROM'),
      to: this.configService.getOrThrow<string>('RESEND_TO'),
      subject: dto.subject,
      html: dto.html,
    });
    if (error) this.logger.error(error.message);
    return error === null;
  }
}
