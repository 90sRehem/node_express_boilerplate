import "express-async-errors";
import cors from "cors";
import express from "express";
import "dotenv/config";

import { AppError } from "@/shared/errors/AppError";

import { routes } from "./routes";

export class App {
  private readonly _app: express.Application;
  private _port: number;

  constructor() {
    this._app = express();
    this.bootstrap();
  }

  public get port(): number {
    return this._port;
  }

  private bootstrap(): void {
    this._app.use(cors({ origin: "http://localhost:3000" }));
    this._app.disable("x-powered-by");
    this._app.use(express.json());
    this._app.use(this.errorMiddleware);
    this._app.use("/api/v1", routes);
  }

  public listen(port: number): void {
    this._port = port;
    this._app.listen(port, () => {
      console.log(`Server started, listening on port ${port} 🚀`);
    });
  }

  public initializeRoutes(routes: express.Router): void {
    this._app.use(routes);
  }

  private errorMiddleware(
    err: Error,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) {
    if (err instanceof AppError) {
      console.error(err);

      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
}
