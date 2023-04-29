import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user-repository';
import { User } from '../../domain/entities/user.entity';

import USERS_MOCK from '../../mocks/users.mock';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  findAll(): Promise<User[]> {
    return Promise.resolve(USERS_MOCK);
  }

  findById(id: number): Promise<User> {
    const user = USERS_MOCK.find((user) => user.id === id);
    return Promise.resolve(user || null);
  }

  save(user: User): Promise<User> {
    USERS_MOCK.push({
      ...user,
      createdAt: new Date(),
    });
    return Promise.resolve(user);
  }
}
