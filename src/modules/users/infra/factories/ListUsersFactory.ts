import { UserQueries } from "../../domain";
import { ListUsersController } from "../controllers/ListUsersControllers";
import { userRepository } from "./CreateUserFactory";

const userQueries = new UserQueries(userRepository);
export const listUsersController = new ListUsersController(userQueries);
