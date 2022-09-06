import { IQuery, IQueryResult } from "../Queries";

export interface IQueryHandler<Q extends IQuery<Q>, R> {
  handle(query: Q): Promise<IQueryResult<R>>;
}
