// import { CONFIG } from "~/configuration/config";
// import { initializeApp } from "firebase-admin/app";
// import { getStorage, Storage } from "firebase-admin/storage";
import { Storage } from "@google-cloud/storage";
// import { credential } from "firebase-admin";
// import { readFile } from "fs/promises";

export const initFirebaseStorage = async (): Promise<Storage> => {
  // const serviceAccount = await readFile(CONFIG.CLOUD.SERVICE_ACCOUNT_PATH);

  const storage = new Storage({ keyFilename: "firebase-adminsdk.json" });
  // const app = initializeApp({
  //   credential: credential.cert(JSON.parse(serviceAccount.toString())),
  //   storageBucket: CONFIG.CLOUD.DEFAULT_BUCKET,
  // });

  return storage;
};
