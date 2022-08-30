import { User } from "../entities";

export class UserMap {
  public static toPersistance(user: User): any {
    return {
      id: user.id.toString(),
      name: user.name.fullName,
      email: user.email.address,
      password: user.password.getHashedValue(),
    };
  }
}
