import bcrypt from "bcrypt";
import { CONFIG } from "~/configuration/config";

export const hashValue = async (value: string): Promise<string> => {
  const salt = await bcrypt.genSalt(CONFIG.APP.enscryption.SALT_ROUNDS);
  const hash = await bcrypt.hash(value, salt);

  return hash;
};