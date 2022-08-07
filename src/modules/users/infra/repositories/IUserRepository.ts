import { Email, User } from "../../domain";

export interface IUserRepository {
  findByEmail(email: string | Email): Promise<User>;
  findById(id: string): Promise<User>;
  save(user: User): Promise<void>;
  list(): Promise<User[]>;
}
