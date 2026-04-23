import { InternalServerErrorException } from '@nestjs/common';
import { EmailController } from '../email.controller';
import { EmailService } from '../email.service';
import { makeDefaultResponseDto } from './factories/default-response.dto.factory';
import { makeSendEmailDto } from './factories/send-email.dto.factory';

describe('EmailController', () => {
  let emailController: EmailController;
  const emailServiceMock = {
    send: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    emailController = new EmailController(
      emailServiceMock as unknown as EmailService,
    );
  });

  describe('send', () => {
    it('should call the service with correct arguments and return a default response', async () => {
      const sendEmailDto = makeSendEmailDto();
      const defaultResponseDto = makeDefaultResponseDto();
      emailServiceMock.send.mockResolvedValue(defaultResponseDto);
      const response = await emailController.send(sendEmailDto);
      expect(emailServiceMock.send).toHaveBeenCalledTimes(1);
      expect(emailServiceMock.send).toHaveBeenCalledWith(sendEmailDto);
      expect(response).toEqual(defaultResponseDto);
    });

    it('should propagate service exceptions', async () => {
      const sendEmailDto = makeSendEmailDto();
      emailServiceMock.send.mockRejectedValue(
        new InternalServerErrorException(),
      );
      await expect(emailController.send(sendEmailDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
