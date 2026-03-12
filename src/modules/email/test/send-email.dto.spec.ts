/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { validate } from 'class-validator';
import { makeSendEmailDto } from './factories/send-email.dto.factory';

describe('SendEmailDto', () => {
  it('should accept when is valid', async () => {
    const dto = makeSendEmailDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail if empty', async () => {
    const dto = makeSendEmailDto({ subject: '' });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('subject');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail if not a string', async () => {
    const dto = makeSendEmailDto({ html: null as any });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('html');
    expect(errors[0].constraints).toHaveProperty('isString');
  });
});
