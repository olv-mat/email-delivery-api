import { SendEmailDto } from '../../dtos/send-email.dto';

export const makeSendEmailDto = (
  override?: Partial<SendEmailDto>,
): SendEmailDto => {
  return Object.assign(new SendEmailDto(), {
    subject: 'Welcome!',
    html: '<h1>Hello, How Are You?</h1>',
    ...override,
  });
};
