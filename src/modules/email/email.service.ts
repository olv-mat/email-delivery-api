import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from './dtos/default-response.dto';
import { SendEmailDto } from './dtos/send-email.dto';
import { EmailContext } from './strategies/email.context';

@Injectable()
export class EmailService {
  constructor(private readonly context: EmailContext) {}

  public async send(dto: SendEmailDto): Promise<DefaultResponseDto> {
    const sent = await this.context.execute(dto);
    return sent
      ? DefaultResponseDto.create(true, 'Email sent successfully')
      : DefaultResponseDto.create(false, 'Failed to send email');
  }
}
