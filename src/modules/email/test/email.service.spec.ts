import { InternalServerErrorException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { EmailService } from '../email.service';
import { EmailContext } from '../strategies/email.context';
import { makeDefaultResponseDto } from './factories/default-response.dto.factory';
import { makeSendEmailDto } from './factories/send-email.dto.factory';

type EmailServiceContext = {
  emailService: EmailService;
  emailContextMock: EmailContext;
};

describe('EmailService', () => {
  let context: EmailServiceContext;
  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: EmailContext,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();
    context = {
      emailService: module.get(EmailService),
      emailContextMock: module.get(EmailContext),
    };
  });

  describe('send', () => {
    it('should return a success response when the email is sent successfully', async () => {
      const { emailService, emailContextMock } = context;
      const sendEmailDto = makeSendEmailDto();
      const defaultResponseDto = makeDefaultResponseDto();
      const spy = jest
        .spyOn(emailContextMock, 'execute')
        .mockResolvedValue(true);
      const response = await emailService.send(sendEmailDto);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(sendEmailDto);
      expect(response).toEqual(defaultResponseDto);
    });

    it('should return a failure response when the email cannot be sent', async () => {
      const { emailService, emailContextMock } = context;
      const sendEmailDto = makeSendEmailDto();
      const defaultResponseDto = makeDefaultResponseDto({
        success: false,
        message: 'Failed to send email',
      });
      const spy = jest
        .spyOn(emailContextMock, 'execute')
        .mockResolvedValue(false);
      const response = await emailService.send(sendEmailDto);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(sendEmailDto);
      expect(response).toEqual(defaultResponseDto);
    });

    it('should propagate context exceptions', async () => {
      const { emailService, emailContextMock } = context;
      const sendEmailDto = makeSendEmailDto();
      jest
        .spyOn(emailContextMock, 'execute')
        .mockRejectedValue(new InternalServerErrorException());
      await expect(emailService.send(sendEmailDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
