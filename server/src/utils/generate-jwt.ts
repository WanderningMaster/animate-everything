import { JWTPayload, SignJWT } from "jose";
import { createSecretKey } from "crypto";

export async function generateJwt<T extends JWTPayload>({ payload, lifetime, secret }: {
  payload: T;
  lifetime: string;
  secret: string;
}): Promise<string> {
  const secretKey = createSecretKey(secret, "utf-8");

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(lifetime)
    .sign(secretKey);
  return jwt;
}
