import { User } from "@/domain/entities";
import { Email, Name, Password } from "@/domain/valueObjects";

describe("User tests", () => {
  it("should return success when creating user", () => {
    const user = new User({
      email: new Email({ address: "johndoe@email.com" }),
      name: new Name({ firstName: "john", lastName: "doe" }),
      password: new Password({ value: "123456" }),
    });

    expect(user.Valid).toBe(true);
  });

  it("should return failure when creating user", () => {
    const user = new User({
      email: new Email({ address: "" }),
      name: new Name({ firstName: "", lastName: "" }),
      password: new Password({ value: "" }),
    });

    expect(user.Invalid).toBe(true);
  });
});
