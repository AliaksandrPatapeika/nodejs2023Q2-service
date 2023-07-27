import { User } from 'src/interfaces';

export class DBService {
  private users: User[] = [];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find(({ id: userId }) => id === userId);
  }

  createUser(user: User) {
    this.users.push(user);
  }

  deleteUserById(id: string) {
    this.users = this.users.filter(({ id: userId }) => id !== userId);
  }
}
