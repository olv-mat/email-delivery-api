import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({ example: 'System Notification: Security Update' })
  @IsNotEmpty()
  @IsString()
  public readonly subject: string;

  @ApiProperty({
    example:
      'Hello, this is an automated message to inform you that your security settings were recently updated. If you did not perform this action, please contact support immediately.',
  })
  @IsNotEmpty()
  @IsString()
  public readonly text: string;
}
