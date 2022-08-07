import { UserRepository } from "@/infra/repositories/UserRepository";

import { CreateUserCommand, CreateUserHandler } from "../../domain";
import { CreateUserController } from "../controllers";

const userRepository = new UserRepository();
const createUserCommand = new CreateUserCommand();
const createUserHandler = new CreateUserHandler(userRepository);
export const createUserController = new CreateUserController(
  createUserHandler,
  createUserCommand,
);
