import { Email, Name, Password, UniqueId, User } from "@/domain";

type PersistanceUser = {
  id?: string;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
};

export class UserMap {
  public static toPersistance(user: User): PersistanceUser {
    return {
      id: user.id.toString(),
      name: user.name.fullName,
      email: user.email.address,
      password: user.password.getHashedValue(),
      createdAt: user.createdAt,
    };
  }

  public static toDomain(raw: PersistanceUser) {
    const [firstName, lastName] = raw.name.split(" ");

    return new User(
      {
        email: new Email({ address: raw.email }),
        name: new Name({ firstName, lastName }),
        password: new Password({ value: raw.password as string }),
        createdAt: raw.createdAt,
      },
      new UniqueId(raw.id),
    );
  }
}
