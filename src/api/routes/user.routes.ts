import { Router } from "express";
import { container } from "tsyringe";

import { CreateUserCommand } from "@/domain/commands";
import { CreateUserHandler } from "@/domain/handlers/CreateUserHandler";
import { UserRepository } from "@/infra/repositories/UserRepository";
import { EControllers } from "@/shared/enums";

import { UserController } from "../controllers/UserController";

export const userRoutes = Router();

// const userRepository = new UserRepository();
// const createUserHandler = new CreateUserHandler(userRepository);
// const userController = new UserController(createUserHandler);
const userController = container.resolve<UserController>(
  EControllers.UserController,
);

userRoutes.post("/", (req, res) => userController.execute(req, res));
