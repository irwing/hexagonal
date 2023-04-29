import { User } from './user.entity';

describe('User', () => {
  describe('constructor', () => {
    it('should create a new user with the given properties', () => {
      const id = 1;
      const name = 'John Doe';
      const createdAt = new Date();

      const user = new User(id, name, createdAt);

      expect(user.id).toBe(id);
      expect(user.name).toBe(name);
      expect(user.createdAt).toBe(createdAt);
    });
  });
});
