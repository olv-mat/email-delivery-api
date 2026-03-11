import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { EmailStrategy } from '../email.strategy';

@Injectable()
export class ResendStrategy extends EmailStrategy {
  private readonly resend: Resend;

  constructor(private readonly configService: ConfigService) {
    super();
    this.resend = new Resend(
      this.configService.getOrThrow<string>('RESEND_KEY'),
    );
  }

  public async send(subject: string, html: string): Promise<void> {
    const { error } = await this.resend.emails.send({
      from: this.configService.getOrThrow<string>('RESEND_FROM'),
      to: this.configService.getOrThrow<string>('RESEND_TO'),
      subject: subject,
      html: html,
    });
    if (error) throw new InternalServerErrorException('Failed to send email');
  }
}
