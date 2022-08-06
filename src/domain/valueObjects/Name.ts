import { Contract } from "@/shared/validations/Contract";

import { ValueObject } from "./ValueObject";

interface INameProps {
  firstName: string;
  lastName: string;
}

export class Name extends ValueObject<INameProps> {
  constructor(props: INameProps) {
    super(props);
    this.AddNotification(
      new Contract()
        .IsRequired()
        .IsNotNullOrEmptyString(
          this.firstName,
          "Name.FirstName",
          "O nome é obrigatório!",
        )
        .HasMinLength(
          this.firstName,
          3,
          "Name.FirstName",
          "Nome deve conter no mínimo 3 carecteres!",
        ),
    );
  }

  public get fullName(): string {
    return `${this.props.firstName} ${this.props.lastName}`;
  }

  public get firstName(): INameProps["firstName"] {
    return this.props.firstName;
  }

  public get lastName(): INameProps["lastName"] {
    return this.props.lastName;
  }
}
