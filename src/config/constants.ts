import "dotenv/config";

export const APP_PORT = process.env.PORT || 3333;
export const ACCESS_TOKEN_PRIVATE_KEY = process.env
  .ACCESS_TOKEN_PRIVATE_KEY as string;
export const ACCESS_TOKEN_PUBLIC_KEY = process.env
  .ACCESS_TOKEN_PUBLIC_KEY as string;

export const REPOSITORIES = {
  UsersRepository: Symbol("UsersRepository"),
  AuthRepository: Symbol("AuthRepository"),
};

export const HANDLERS = {
  SessionHandler: Symbol("SessionHandler"),
};

export const MIDDLEWARES = {
  AuthGuardMiddleWare: Symbol("AuthGuardMiddleWare"),
};
