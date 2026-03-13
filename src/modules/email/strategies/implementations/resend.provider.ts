import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

export const RESEND_CLIENT = 'RESEND_CLIENT';
export const ResendProvider = {
  provide: RESEND_CLIENT,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    new Resend(configService.getOrThrow<string>('RESEND_KEY')),
};
