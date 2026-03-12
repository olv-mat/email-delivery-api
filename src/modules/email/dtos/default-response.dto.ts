export class DefaultResponseDto {
  public readonly success: boolean;
  public readonly message: string;

  private constructor(success: boolean, message: string) {
    this.success = success;
    this.message = message;
  }

  public static success(): DefaultResponseDto {
    return new DefaultResponseDto(true, 'Email sent successfully');
  }

  public static failed(): DefaultResponseDto {
    return new DefaultResponseDto(false, 'Failed to send email');
  }
}
