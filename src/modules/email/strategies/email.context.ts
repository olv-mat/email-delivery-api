import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from '../dtos/default-response.dto';
import { SendEmailDto } from '../dtos/send-email.dto';
import { EmailStrategy } from './email.strategy';

@Injectable()
export class EmailContext {
  constructor(private readonly strategy: EmailStrategy) {}

  public execute(dto: SendEmailDto): Promise<DefaultResponseDto> {
    return this.strategy.send(dto);
  }
}
