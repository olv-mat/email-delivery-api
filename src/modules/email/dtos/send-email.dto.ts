import { IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @IsNotEmpty()
  @IsString()
  public readonly subject: string;

  @IsNotEmpty()
  @IsString()
  public readonly text: string;
}
