export class DefaultResponseDto {
  public readonly success: boolean;
  public readonly message: string;

  private constructor(success: boolean, message: string) {
    this.success = success;
    this.message = message;
  }

  public static create(success: boolean, message: string): DefaultResponseDto {
    return new DefaultResponseDto(success, message);
  }
}
