import { BaseEntity, UniqueId } from "@/shared/domain";

import { Avatar, Email, Name, Password } from "../valueObjects";

interface IUserProps {
  name: Name;
  email: Email;
  password: Password;
  avatar?: Avatar;
}

export class User extends BaseEntity<IUserProps> {
  constructor(props: IUserProps, id?: UniqueId) {
    super(props, id);
    this.AddNotifications(this._props.email.GetNotifications);
    this.AddNotifications(this._props.name.GetNotifications);
    this.AddNotifications(this._props.password.GetNotifications);
  }

  public get name(): Name {
    return this._props.name;
  }

  public get email(): Email {
    return this._props.email;
  }

  public get password(): Password {
    return this._props.password;
  }

  public get avatar(): Avatar | null {
    return this._props.avatar || null;
  }
}