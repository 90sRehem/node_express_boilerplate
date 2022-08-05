import { randomUUID } from "crypto";

export class UniqueId {
  private _value: string;

  constructor(id?: string) {
    this._value = id || randomUUID();
  }

  public Equals(id?: UniqueId): boolean {
    if (id === null || id === undefined) {
      return false;
    }

    if (!(id instanceof UniqueId)) {
      return false;
    }

    return id.ToValue() === this._value;
  }

  ToString(): string {
    return String(this._value);
  }

  ToValue(): string {
    return this._value;
  }
}
