import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserAlreadyExistsException } from '../domain/exceptions/user-already-exists.exception';
import { UsersService } from '../application/users.service';
import { InMemoryUserRepository } from './repositories/memory.user.repository';

import USERS_MOCK from '../mocks/users.mock';

const generateUserId = () => USERS_MOCK[USERS_MOCK.length - 1].id + 1;

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: 'UserRepository',
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of users', async () => {
    const users = await controller.findAll();
    expect(users).toBe(USERS_MOCK);
  });

  it('should return an user by id', async () => {
    const user = await controller.findById(USERS_MOCK[0].id);
    expect(user).toBe(USERS_MOCK[0]);
  });

  it('should create an user', async () => {
    const userSaved = await controller.save(generateUserId(), {
      name: 'test',
    });
    expect(userSaved.createdAt).toBeDefined();
  });

  it('should throw UserAlreadyExistsException when user already exists', async () => {
    const userId = USERS_MOCK[0].id;
    try {
      await controller.save(userId, {
        name: 'test',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(UserAlreadyExistsException);
      expect(error.message).toBe(`User with id ${userId} already exists`);
    }
  });
});
