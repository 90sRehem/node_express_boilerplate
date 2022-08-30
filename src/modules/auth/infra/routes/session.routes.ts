import { Router } from "express";

import { createSessionController } from "../factories";
import { createRefreshTokenController } from "../factories/CreateRefreshTokenFactory";

export const sessionRoutes: Router = Router();

sessionRoutes.post("/login", (req, res) =>
  createSessionController.execute(req, res),
);

sessionRoutes.post("/refresh", (req, res) =>
  createRefreshTokenController.execute(req, res),
);
