import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
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
    try {
      const { error } = await this.resend.emails.send({
        from: this.configService.getOrThrow<string>('RESEND_FROM'),
        to: this.configService.getOrThrow<string>('RESEND_TO'),
        subject: dto.subject,
        text: dto.text,
      });
      if (error) {
        this.logger.error(error.message);
        return false;
      }
      this.logger.log('Email sent successfully');
      return true;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
