import { ICommand } from "@/shared/commands";
import { Notifiable } from "@/shared/notifications";
import { Contract } from "@/shared/validations/Contract";

import { ICreateUserDTO } from "../dtos";

export class CreateUserCommand
  extends Notifiable
  implements ICommand<ICreateUserDTO>
{
  public email: string;
  public firstName: string;
  public lastName: string;
  public password: string;

  constructor() {
    super();
  }
  resolve({ email, firstName, lastName, password }: ICreateUserDTO) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    return this;
  }

  validate(): void {
    this.AddNotification(
      new Contract()
        .IsNotNullOrEmptyString(
          this.firstName,
          "firstName",
          "O nome é obrigatório!",
        )
        .HasMinLength(
          this.firstName,
          3,
          "firstName",
          "O nome deve conter pelo menos 3 caracteres.",
        ),
    );
    this.AddNotification(
      new Contract()
        .IsNotNullOrEmptyString(this.email, "email", "E-mail obrigatório!")
        .IsEmail(this.email, "email", "E-mail inválido!"),
    );
    this.AddNotification(
      new Contract()
        .IsNotNullOrEmptyString(
          this.password,
          "password",
          "A senha é obrigatória!",
        )
        .HasMinLength(
          this.password,
          6,
          "password",
          "A senha deve ter pelo menos 6 caracteres.",
        ),
    );
  }
}
