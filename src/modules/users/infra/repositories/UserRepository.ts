import { UniqueId } from "@/shared/domain";

import { User, Email, Name, Password } from "../../domain";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  private users: User[] = [];

  /**
   *
   */
  constructor() {
    const standardUser = new User(
      {
        email: new Email({ address: "jonathan.rehem@gmail.com" }),
        name: new Name({ firstName: "jonathan", lastName: "rehem" }),
        password: new Password({ value: "123456" }),
      },
      new UniqueId("d30ecf70-0709-4e6b-ad9c-c8a8d4d0a25b"),
    );
    this.users.push(standardUser);
  }

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
      return user.id.toString() === id;
    }) as User;
  }
  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
