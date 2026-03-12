import { Body, Controller, Post } from '@nestjs/common';
import { DefaultResponseDto } from './dtos/default-response.dto';
import { SendEmailDto } from './dtos/send-email.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  public async send(@Body() dto: SendEmailDto): Promise<DefaultResponseDto> {
    return await this.emailService.send(dto);
  }
}
