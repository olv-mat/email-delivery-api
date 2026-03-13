import { SendEmailDto } from '../../dtos/send-email.dto';

export const makeSendEmailDto = (
  override?: Partial<SendEmailDto>,
): SendEmailDto => {
  return Object.assign(new SendEmailDto(), {
    subject: 'System Notification: Security Update',
    text: 'Hello, this is an automated message to inform you that your security settings were recently updated. If you did not perform this action, please contact support immediately.',
    ...override,
  });
};
