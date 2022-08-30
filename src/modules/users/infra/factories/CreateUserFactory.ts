import { CreateUserHandler } from "../../domain";
import { CreateUserController } from "../controllers";
import { UserRepository } from "../repositories";

export const userRepository = new UserRepository();
const createUserHandler = new CreateUserHandler(userRepository);
export const createUserController = new CreateUserController(createUserHandler);
