import { Inject, Injectable } from '@nestjs/common';

import { UserRepository } from '../domain/user-repository';

// TODO: this should be in the slice of the domain
import { UserNotFoundException } from '../domain/exceptions/user-not-found.exception';
import { UserAlreadyExistsException } from '../domain/exceptions/user-already-exists.exception';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
  ) {}

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findById(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  async save(user: any) {
    const userExists = await this.userRepository.findById(user.id);
    if (userExists) {
      throw new UserAlreadyExistsException(user.id);
    }

    const userInsert = {
      ...user,
      createdAt: new Date(),
    };

    await this.userRepository.save(userInsert);

    return userInsert;
  }
}
