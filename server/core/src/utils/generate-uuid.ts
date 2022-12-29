import crypto from "crypto";

export const genUUID = (): string => crypto.randomUUID();
