import { Avatar, Email, Name, Password } from "../valueObjects";
import { BaseEntity } from "./BaseEntity";
import { UniqueId } from "./UniqueId";

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
    // this.AddNotifications(this.avatar.GetNotifications);
  }

  public get id(): string {
    return this._id.ToValue();
  }
  public get name(): string {
    return this._props.name.fullName;
  }

  public get email(): string {
    return this._props.email.address;
  }

  protected get password(): string {
    return this._props.password.value;
  }

  public get avatar(): Avatar | null {
    return this._props.avatar || null;
  }

  public get toObj() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
