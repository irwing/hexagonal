import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { InMemoryUserRepository } from '../infrastructure/repositories/memory.user.repository';

import USERS_MOCK from '../mocks/users.mock';
import { UserAlreadyExistsException } from '../domain/exceptions/user-already-exists.exception';
import { UserNotFoundException } from '../domain/exceptions/user-not-found.exception';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'UserRepository',
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    const users = await service.findAll();
    expect(users).toBe(USERS_MOCK);
  });

  it('should return an user by id', async () => {
    const user = await service.findById(USERS_MOCK[0].id);
    expect(user).toBe(USERS_MOCK[0]);
  });

  it('should return NotFoundException when user does not exists', async () => {
    const userId = 999;
    try {
      await service.findById(userId);
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFoundException);
      expect(error.message).toBe(`User with id ${userId} not found`);
    }
  });

  it('should create an user', async () => {
    const newUser = {
      id: USERS_MOCK[USERS_MOCK.length - 1].id + 1,
      name: 'test',
    };
    const userSaved = await service.save(newUser);
    expect(userSaved.createdAt).toBeDefined();
  });

  it('should throw UserAlreadyExistsException when user already exists', async () => {
    const userId = USERS_MOCK[0].id;
    try {
      await service.save({
        id: userId,
        name: 'test',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(UserAlreadyExistsException);
      expect(error.message).toBe(`User with id ${userId} already exists`);
    }
  });
});
