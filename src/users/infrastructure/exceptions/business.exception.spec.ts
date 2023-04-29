import { Test, TestingModule } from '@nestjs/testing';
import { BusinessExceptions } from './business.exception';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { UserAlreadyExistsException } from '../../domain/exceptions/user-already-exists.exception';

describe('BusinessExceptionsFilter', () => {
  let businessExceptions: BusinessExceptions;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [BusinessExceptions],
    }).compile();

    businessExceptions = moduleRef.get<BusinessExceptions>(BusinessExceptions);
  });

  it('should catch a UserNotFoundException and return a 500 error', () => {
    const businessExceptions = new BusinessExceptions();

    const Error500 = new Error('Internal server error');

    const error = businessExceptions.isBusinessException(Error500);

    expect(error).toEqual({
      message: 'Internal server error',
      status: 500,
    });
  });

  it('should catch a UserAlreadyExistsException and return a 400 error', () => {
    const businessExceptions = new BusinessExceptions();

    const error = businessExceptions.isBusinessException(
      new UserAlreadyExistsException(1),
    );

    expect(error).toEqual({
      message: 'User with id 1 already exists',
      status: 400,
    });
  });

  it('should catch a UserNotFoundException and return a 404 error', () => {
    const businessExceptions = new BusinessExceptions();

    const error = businessExceptions.isBusinessException(
      new UserNotFoundException(1),
    );

    expect(error).toEqual({
      message: 'User with id 1 not found',
      status: 404,
    });
  });
});
