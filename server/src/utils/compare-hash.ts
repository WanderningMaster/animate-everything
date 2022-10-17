import bcrypt from "bcrypt";

export function compareHash(candidate: string, hash: string): Promise<boolean> {
  return bcrypt.compare(candidate, hash);
}
