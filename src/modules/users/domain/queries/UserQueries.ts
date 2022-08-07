import { IUserRepository } from "../../infra";

export class UserQueries {
  constructor(private readonly _repository: IUserRepository) { }
  async getById(id: string) {
    return this._repository.findById(id);
  }
}
