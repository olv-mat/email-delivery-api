import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export const SwaggerForbidden = (message: string) => {
  return ApiForbiddenResponse({
    schema: {
      example: {
        message: message,
        error: 'Forbidden',
        statusCode: 403,
      },
    },
  });
};

export const SwaggerInternalServerError = () => {
  return ApiInternalServerErrorResponse({
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
      },
    },
  });
};
