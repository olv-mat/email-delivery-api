/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { InternalServerErrorException } from '@nestjs/common';
import { EmailController } from '../email.controller';
import { makeDefaultResponseDto } from './factories/default-response.dto.factory';
import { makeSendEmailDto } from './factories/send-email.dto.factory';

describe('EmailController', () => {
  let emailController: EmailController;
  const emailServiceMock = {
    send: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    emailController = new EmailController(emailServiceMock as any);
  });

  describe('send', () => {
    it('should call the service with correct arguments and return the response', async () => {
      const dto = makeSendEmailDto();
      const expectedResponse = makeDefaultResponseDto();
      emailServiceMock.send.mockResolvedValue(expectedResponse);
      const response = await emailController.send(dto);
      expect(emailServiceMock.send).toHaveBeenCalledTimes(1);
      expect(emailServiceMock.send).toHaveBeenCalledWith(dto);
      expect(response).toEqual(expectedResponse);
    });

    it('should propagate errors from the service', async () => {
      const dto = makeSendEmailDto();
      emailServiceMock.send.mockRejectedValue(
        new InternalServerErrorException(),
      );
      await expect(emailController.send(dto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
