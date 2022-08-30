import { Router } from "express";

import { ensureAuthenticated } from "@/api/middlewares/ensureAuthenticated";

import { createUserController } from "../factories";
import { listUsersController } from "../factories/ListUsersFactory";

export const userRoutes: Router = Router();

userRoutes.post("/", (req, res) => createUserController.execute(req, res));
userRoutes.get("/", ensureAuthenticated, (req, res) =>
  listUsersController.execute(req, res),
);
