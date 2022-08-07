import { container } from "tsyringe";

import { HealthCheckController } from "@/api/controllers";
import { UserController } from "@/api/controllers/UserController";
import { CreateUserCommand } from "@/domain/commands";
import { CreateUserHandler } from "@/domain/handlers/CreateUserHandler";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { UserRepository } from "@/infra/repositories/UserRepository";

import { ECommands, EControllers, EHandlers, ERepositories } from "../enums";

container.registerSingleton<HealthCheckController>(
  EControllers.HealthCheckController,
  HealthCheckController,
);

container.registerSingleton<UserController>(
  EControllers.UserController,
  UserController,
);

container.registerSingleton<IUserRepository>(
  ERepositories.UserRepository,
  UserRepository,
);

container.registerSingleton<CreateUserCommand>(
  ECommands.CreateUserCommand,
  CreateUserCommand,
);

container.registerSingleton<CreateUserHandler>(
  EHandlers.CreateUserHandler,
  CreateUserHandler,
);
