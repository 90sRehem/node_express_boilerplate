import { UserRepository } from "@/infra/repositories/UserRepository";

import { CreateUserHandler } from "../../domain";
import { CreateUserController } from "../controllers";

const userRepository = new UserRepository();
const createUserHandler = new CreateUserHandler(userRepository);
export const createUserController = new CreateUserController(createUserHandler);
