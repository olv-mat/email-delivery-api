import { Injectable } from '@nestjs/common';
import { EmailStrategy } from './email.strategy';

@Injectable()
export class EmailContext {
  constructor(private readonly strategy: EmailStrategy) {}

  public execute(subject: string, html: string): Promise<void> {
    return this.strategy.send(subject, html);
  }
}
