import { verify } from "https://deno.land/x/djwt@v2.8/mod.ts";
import { type UserState } from "./types/interfaces.ts";

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  exp: number;
}

interface AuthConfig {
  KEY: CryptoKey;
  generateKey: () => Promise<CryptoKey>;
}

let storedKey: CryptoKey | null = null;

export async function generateKey(): Promise<CryptoKey> {
  return await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );
}

export async function getKey(): Promise<CryptoKey> {
  if (!storedKey) {
    storedKey = await generateKey();
  }
  return storedKey;
}

export const KEY = getKey();

export const getUserFromToken = async (
  token: string,
  KEY: CryptoKey,
): Promise<UserState> => {
  try {
    if (!token) {
      return { isAuthenticated: false, role: "guest" };
    }

    const payload = await verify(token, KEY) as unknown as JWTPayload;

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return { isAuthenticated: false, role: "guest" };
    }

    return {
      isAuthenticated: true,
      role: payload.role as "user" | "admin",
    };
  } catch (error) {
    console.error("Token verification error:", error);
    return { isAuthenticated: false, role: "guest" };
  }
};
