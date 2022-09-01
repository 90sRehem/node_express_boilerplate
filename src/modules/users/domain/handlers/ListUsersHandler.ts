import { IQueryHandler } from "@/shared/handlers";
import { Notifiable } from "@/shared/notifications";
import { IQueryResult } from "@/shared/Queries";
import { QueryResult } from "@/shared/Queries/QueryResult";

import { IUserRepository } from "../../infra";
import { IListUsersDTO } from "../dtos/IListUsersDTO";
import { ListUsersQuery } from "../queries/ListUsersQuery";

export class ListUsersHandler
  extends Notifiable
  implements IQueryHandler<ListUsersQuery, IListUsersDTO>
{
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  async handle(query: ListUsersQuery): Promise<IQueryResult<IListUsersDTO>> {
    const users = query.execute(await this.userRepository.list());

    if (!users.length)
      return new QueryResult(false, "Nenhum usuário encontrado.", users);

    return new QueryResult(true, "Sucesso.", users);
  }
}
