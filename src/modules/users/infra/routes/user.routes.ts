import { Router } from "express";

import { createUserController } from "../factories";

export const userRoutes = Router();

userRoutes.post("/", (req, res) => createUserController.execute(req, res));
