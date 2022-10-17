import { createSecretKey } from "crypto";
import { JWTPayload, jwtVerify } from "jose";

export async function verifyJwt<T extends JWTPayload>({ jwt, secret }: {
  jwt: string;
  secret: string;
}): Promise<T> {
  const secretKey = createSecretKey(secret, "utf-8");
  return (await jwtVerify(jwt, secretKey)).payload as T;
}
