import { Secret } from "jsonwebtoken";

import "dotenv/config";
import { ACCESS_TOKEN_PRIVATE_KEY, ACCESS_TOKEN_PUBLIC_KEY } from "./constants";

interface IAuthConfig {
  jwt: {
    privateKey: Secret;
    publicKey: Secret;
    tokenExpiresIn: number | string;
    refreshTokenExpiresIn: number | string;
  };
}

export const authConfig: IAuthConfig = {
  jwt: {
    tokenExpiresIn: "15m",
    refreshTokenExpiresIn: "7d",
    privateKey: ACCESS_TOKEN_PRIVATE_KEY,
    publicKey: ACCESS_TOKEN_PUBLIC_KEY,
    // privateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY?.replace(
    //   /\\n/gm,
    //   "\n",
    // ) as string,
    // publicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY?.replace(
    //   /\\n/gm,
    //   "\n",
    // ) as string,
  },
};
