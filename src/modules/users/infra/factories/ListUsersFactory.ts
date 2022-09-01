import { ListUsersHandler } from "../../domain/handlers/ListUsersHandler";
import { ListUsersController } from "../controllers/ListUsersControllers";
import { userRepository } from "./CreateUserFactory";

const listUsersHandler = new ListUsersHandler(userRepository);
export const listUsersController = new ListUsersController(listUsersHandler);
