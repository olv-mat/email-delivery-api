import { SendEmailDto } from '../dtos/send-email.dto';

export abstract class EmailStrategy {
  public abstract send(dto: SendEmailDto): Promise<boolean>;
}
