import { Notifiable } from "@/shared/notifications";
import { Contract } from "@/shared/validations/Contract";

import { ICommand } from "./interfaces";

export class CreateUserCommand extends Notifiable implements ICommand {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public password: string,
  ) {
    super();
  }

  validate(): void {
    this.AddNotification(
      new Contract()
        .IsRequired()
        .HasMinLength(
          this.firstName,
          3,
          "firstName",
          "O nome deve conter pelo menos 3 caracteres.",
        ),
    );
    this.AddNotification(
      new Contract()
        .IsRequired()
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
