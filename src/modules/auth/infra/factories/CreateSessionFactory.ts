import { userRepository } from "@/modules/users";

import { CreateSessionHandler } from "../../domain";
import { CreateSessionController } from "../controllers";
import { AuthRepository } from "../repositories";

export const authRepository = new AuthRepository();
const createSessionHandler = new CreateSessionHandler(
  userRepository,
  authRepository,
);

export const createSessionController = new CreateSessionController(
  createSessionHandler,
);
