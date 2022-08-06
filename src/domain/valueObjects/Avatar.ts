import { Contract } from "@/shared/validations/Contract";

import { ValueObject } from "./ValueObject";

interface IAvatarProps {
  url: string;
}

export class Avatar extends ValueObject<IAvatarProps> {
  constructor(props: IAvatarProps) {
    super(props);
    this.AddNotification(
      new Contract()
        .IsRequired()
        .IsUrl(this.props.url, "Avatar.Url", "Url inválida."),
    );
  }

  public get url(): IAvatarProps["url"] {
    return this.props.url;
  }
}
