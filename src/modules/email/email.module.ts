import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { EmailContext } from './strategies/email.context';
import { EmailStrategy } from './strategies/email.strategy';
import { ResendStrategy } from './strategies/implementations/resend.strategy';

@Module({
  controllers: [EmailController],
  providers: [
    EmailService,
    EmailContext,
    ResendStrategy,
    {
      provide: EmailStrategy,
      useExisting: ResendStrategy,
    },
  ],
})
export class EmailModule {}
