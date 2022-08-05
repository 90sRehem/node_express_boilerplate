import { Notifiable } from "@/shared/notifications";

import { UniqueId } from "./UniqueId";

export abstract class BaseEntity<T> extends Notifiable {
  protected readonly _id: UniqueId;
  public readonly _props: T;

  constructor(props: T, id?: UniqueId) {
    super();
    this._id = id || new UniqueId();
    this._props = props;
  }

  public get id(): string {
    return this._id.ToString();
  }

  public Equals(object?: BaseEntity<T>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!(object instanceof BaseEntity)) {
      return false;
    }

    return this._id.Equals(object._id);
  }
}
