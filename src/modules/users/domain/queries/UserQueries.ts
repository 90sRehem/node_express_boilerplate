import { IUserRepository } from "../../infra";
import { UserMap } from "../mappers";

export class UserQueries {
  constructor(private readonly _repository: IUserRepository) { }
  async getById(id: string) {
    return this._repository.findById(id);
  }
  async list() {
    const usersList = await this._repository.list();
    return usersList.map(user => {
      const formattedUser = UserMap.toPersistance(user);
      delete formattedUser.password;
      return formattedUser;
    });
  }
}
