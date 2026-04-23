import { validate } from 'class-validator';
import { makeSendEmailDto } from './factories/send-email.dto.factory';

describe('SendEmailDto', () => {
  it('should accept when is valid', async () => {
    const dto = makeSendEmailDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail if is empty', async () => {
    const dto = makeSendEmailDto({ subject: '' });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('subject');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail if is not a string', async () => {
    const dto = makeSendEmailDto({ text: undefined });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('text');
    expect(errors[0].constraints).toHaveProperty('isString');
  });
});
