import { Storage } from "@google-cloud/storage";

export interface CloudServiceContainer {
  storage: Storage;
}
