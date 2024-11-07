import { type JwtClaims } from "./types/interfaces.ts";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const SECRET_KEY = "qweqewqeqweqweq";

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  exp: number;
}

export { SECRET_KEY };

// deno-lint-ignore no-explicit-any
export const generateToken = (claims: { [key: string]: any }) => {
  return jwt.sign(JSON.stringify(claims), SECRET_KEY, {
    algorithm: "HS512",
  });
};

export const getUserFromToken = (
  token: string,
): Promise<JwtClaims> => {
  try {
    if (!token) {
      return Promise.reject(new Error("token empty"));
    }

    const payload = jwt.verify(token.toString(), SECRET_KEY, {
      algorithms: ["HS512"],
    }) as unknown as JWTPayload;

    if (Date.now() > payload.exp) {
      return Promise.reject(new Error("expired jwt"));
    }

    return Promise.resolve(payload);
  } catch (error) {
    console.error("Token verification error:", error);
    return Promise.reject(error);
  }
};
