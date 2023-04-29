/* eslint-disable @typescript-eslint/no-useless-constructor */
export class UserNotFoundException extends Error {
  private statusCode: number;
  constructor(id: number) {
    const message = `User with id ${id} not found`;
    super(message);
    this.statusCode = 404;
  }
}
