import { IQuery, IQueryResult } from "@/shared/Queries";

import { IListUsersDTO } from "../dtos/IListUsersDTO";
import { User } from "../entities";
import { UserMap } from "../mappers";

export class ListUsersQuery implements IQuery<IQueryResult<IListUsersDTO>> {
  constructor(public readonly id: string) { }
  execute(users: User[]): IListUsersDTO {
    return users
      .map(user => {
        const formattedUser = UserMap.toPersistance(user);
        delete formattedUser.password;
        return formattedUser;
      })
      .filter(user => user.id !== this.id);
  }
}
