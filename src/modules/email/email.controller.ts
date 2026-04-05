import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOperation } from '@nestjs/swagger';
import { FixedTokenGuard } from 'src/common/guards/fixed-token.guard';
import { DefaultResponseDto } from './dtos/default-response.dto';
import { SendEmailDto } from './dtos/send-email.dto';
import { EmailService } from './email.service';

@Controller('email')
@UseGuards(FixedTokenGuard)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  @ApiOperation({ summary: 'Send a personal email' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
      },
    },
  })
  public send(@Body() dto: SendEmailDto): Promise<DefaultResponseDto> {
    return this.emailService.send(dto);
  }
}
