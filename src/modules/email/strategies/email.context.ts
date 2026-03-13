import { Injectable } from '@nestjs/common';
import { SendEmailDto } from '../dtos/send-email.dto';
import { EmailStrategy } from './email.strategy';

@Injectable()
export class EmailContext {
  constructor(private readonly strategy: EmailStrategy) {}

  public execute(dto: SendEmailDto): Promise<boolean> {
    return this.strategy.send(dto);
  }
}
