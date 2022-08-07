import { Email, IUserRepository, User } from "@/modules/users";

export class UserRepository implements IUserRepository {
  private users: User[] = [];

  async list(): Promise<User[]> {
    return this.users;
  }

  async findByEmail(email: string | Email): Promise<User> {
    return this.users.find(user => {
      return email instanceof Email
        ? user.email.address === email.address
        : user.email.address === email;
    }) as User;
  }
  async findById(id: string): Promise<User> {
    return this.users.find(user => {
      return user.id.toValue() === id;
    }) as User;
  }
  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
