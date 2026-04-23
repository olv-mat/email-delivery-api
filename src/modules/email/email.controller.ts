import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { FixedTokenGuard } from 'src/common/guards/fixed-token.guard';
import {
  SwaggerForbidden,
  SwaggerInternalServerError,
} from 'src/common/swagger/decorators.swagger';
import { DefaultResponseDto } from './dtos/default-response.dto';
import { SendEmailDto } from './dtos/send-email.dto';
import { EmailService } from './email.service';

@Controller('email')
@ApiBearerAuth()
@UseGuards(FixedTokenGuard)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  @ApiOperation({ summary: 'Send a personal email' })
  @SwaggerForbidden('Forbidden resource')
  @SwaggerInternalServerError()
  public send(@Body() dto: SendEmailDto): Promise<DefaultResponseDto> {
    return this.emailService.send(dto);
  }
}
