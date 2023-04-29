import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/users.controller';
import { UsersService } from './application/users.service';
import { InMemoryUserRepository } from './infrastructure/repositories/memory.user.repository';

@Module({
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useClass: InMemoryUserRepository,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
