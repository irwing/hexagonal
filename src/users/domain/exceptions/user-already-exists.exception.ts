/* eslint-disable @typescript-eslint/no-useless-constructor */
export class UserAlreadyExistsException extends Error {
  constructor(id: number) {
    const message = `User with id ${id} already exists`;
    super(message);
  }
}
