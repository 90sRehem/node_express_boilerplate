import { injectable } from "tsyringe";

import { User } from "@/domain/entities";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { Email } from "@/domain/valueObjects";

@injectable()
export class UserRepository implements IUserRepository {
  private users: User[] = [];

  async findByEmail(email: string | Email): Promise<User> {
    return this.users.find(user => {
      return email instanceof Email
        ? user.email.value === email.value
        : user.email.value === email;
    });
  }
  async findById(id: string): Promise<User> {
    return this.users.find(user => {
      return user.id.toValue() === id;
    });
  }
  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
