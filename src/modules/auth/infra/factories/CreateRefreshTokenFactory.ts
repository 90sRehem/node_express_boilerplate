import { userRepository } from "@/modules/users";

import { CreateRefreshTokenHandler } from "../../domain";
import { CreateRefreshTokenController } from "../controllers";
import { AuthRepository } from "../repositories";

const authRepository = new AuthRepository();
const createRefreshTokenHandler = new CreateRefreshTokenHandler(
  authRepository,
  userRepository,
);
export const createRefreshTokenController = new CreateRefreshTokenController(
  createRefreshTokenHandler,
);
