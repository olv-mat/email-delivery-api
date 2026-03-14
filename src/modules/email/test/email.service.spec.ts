/* eslint-disable @typescript-eslint/unbound-method */
import { InternalServerErrorException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { EmailService } from '../email.service';
import { EmailContext } from '../strategies/email.context';
import { makeDefaultResponseDto } from './factories/default-response.dto.factory';
import { makeSendEmailDto } from './factories/send-email.dto.factory';

type EmailServiceContext = {
  emailContextMock: EmailContext;
  emailService: EmailService;
};

describe('EmailService', () => {
  let context: EmailServiceContext;
  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        { provide: EmailContext, useValue: { execute: jest.fn() } },
        EmailService,
      ],
    }).compile();
    context = {
      emailContextMock: module.get(EmailContext),
      emailService: module.get(EmailService),
    };
  });

  describe('send', () => {
    it('should return a success response when the email is sent successfully', async () => {
      const { emailContextMock, emailService } = context;
      const dto = makeSendEmailDto();
      const expectedResponse = makeDefaultResponseDto();
      jest.spyOn(emailContextMock, 'execute').mockResolvedValue(true);
      const response = await emailService.send(dto);
      expect(emailContextMock.execute).toHaveBeenCalledTimes(1);
      expect(emailContextMock.execute).toHaveBeenCalledWith(dto);
      expect(response).toEqual(expectedResponse);
    });

    it('should return a failure response when the email cannot be sent', async () => {
      const { emailContextMock, emailService } = context;
      const dto = makeSendEmailDto();
      const expectedResponse = makeDefaultResponseDto({
        success: false,
        message: 'Failed to send email',
      });
      jest.spyOn(emailContextMock, 'execute').mockResolvedValue(false);
      const response = await emailService.send(dto);
      expect(emailContextMock.execute).toHaveBeenCalledTimes(1);
      expect(emailContextMock.execute).toHaveBeenCalledWith(dto);
      expect(response).toEqual(expectedResponse);
    });

    it('should propagate errors from the context', async () => {
      const { emailContextMock, emailService } = context;
      const dto = makeSendEmailDto();
      jest
        .spyOn(emailContextMock, 'execute')
        .mockRejectedValue(new InternalServerErrorException());
      await expect(emailService.send(dto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
