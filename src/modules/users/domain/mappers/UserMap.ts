import { User } from "../entities";

export class UserMap {
  public static async toPersistance(user: User): Promise<any> {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email.address,
      password: await user.password.getHashedValue(),
    };
  }
}
