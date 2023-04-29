import { User } from './entities/user.entity';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  save(user: User): Promise<User>;
}
