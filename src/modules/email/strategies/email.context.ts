import { Injectable } from '@nestjs/common';
import { EmailStrategy } from './email.strategy';

@Injectable()
export class EmailContext {
  constructor(private readonly strategy: EmailStrategy) {}

  public execute(html: string): Promise<void> {
    return this.strategy.send(html);
  }
}
