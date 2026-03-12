import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { DefaultResponseDto } from '../../dtos/default-response.dto';
import { SendEmailDto } from '../../dtos/send-email.dto';
import { EmailStrategy } from '../email.strategy';

@Injectable()
export class ResendStrategy extends EmailStrategy {
  private readonly resend: Resend;
  private readonly logger = new Logger(ResendStrategy.name);

  constructor(private readonly configService: ConfigService) {
    super();
    this.resend = new Resend(
      this.configService.getOrThrow<string>('RESEND_KEY'),
    );
  }

  public async send(dto: SendEmailDto): Promise<DefaultResponseDto> {
    const { error } = await this.resend.emails.send({
      from: this.configService.getOrThrow<string>('RESEND_FROM'),
      to: this.configService.getOrThrow<string>('RESEND_TO'),
      subject: dto.subject,
      html: dto.html,
    });
    if (error) {
      this.logger.error(error.message);
      return DefaultResponseDto.failed();
    }
    return DefaultResponseDto.success();
  }
}
