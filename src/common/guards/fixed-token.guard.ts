import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class FixedTokenGuard implements CanActivate {
  private readonly token: string;

  constructor(private readonly configService: ConfigService) {
    this.token = this.configService.getOrThrow<string>('TOKEN');
  }

  public canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers?.authorization;
    const [type, value] = authorization ? authorization.split(' ') : [];
    return type === 'Bearer' && value === this.token;
  }
}
