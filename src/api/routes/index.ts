import { Router } from "express";

import { sessionRoutes } from "@/modules/auth";
import { userRoutes } from "@/modules/users";

import { healthcheckRoutes } from "./healthcheck.routes";

export const routes: Router = Router();

routes.use("/", healthcheckRoutes);
routes.use("/users", userRoutes);
routes.use("/session", sessionRoutes);
