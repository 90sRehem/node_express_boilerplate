import { Request, Response, NextFunction } from "express";

import { AuthRepository } from "@/modules/auth";

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization;
  const authRepository = new AuthRepository();

  if (authToken) {
    const [, token] = authToken.split(" ");

    try {
      const verifyToken = authRepository.verify(token);
      req.user = verifyToken.sub as string;
      return next();
    } catch (err) {
      console.log(`auth-error: ${err.message}`);

      return res.status(401).send();
    }
  }

  return res.status(401).send();
}
