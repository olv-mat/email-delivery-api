import { DefaultResponseDto } from '../../dtos/default-response.dto';

export const makeDefaultResponseDto = (
  override?: Partial<DefaultResponseDto>,
): DefaultResponseDto => {
  const dto = DefaultResponseDto.create(true, 'Email sent successfully');
  return Object.assign(dto, override);
};
