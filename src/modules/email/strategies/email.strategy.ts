import { DefaultResponseDto } from '../dtos/default-response.dto';
import { SendEmailDto } from '../dtos/send-email.dto';

export abstract class EmailStrategy {
  public abstract send(dto: SendEmailDto): Promise<DefaultResponseDto>;
}
