import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { UserAlreadyExistsException } from '../../domain/exceptions/user-already-exists.exception';

@Catch()
export class BusinessExceptions implements ExceptionFilter<Error> {
  private readonly businessExceptions400 = [UserAlreadyExistsException];
  private readonly businessExceptions404 = [UserNotFoundException];

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const { message, status } = this.isBusinessException(exception);

    res.status(status).json({
      message,
      statusCode: status,
    });
  }

  public isBusinessException(exception: Error): any {
    if (this.businessExceptions400.some((e) => exception instanceof e)) {
      return {
        message: exception.message,
        status: 400,
      };
    }

    if (this.businessExceptions404.some((e) => exception instanceof e)) {
      return {
        message: exception.message,
        status: 404,
      };
    }

    Logger.log(exception.stack);
    return {
      message: 'Internal server error',
      status: 500,
    };
  }
}
