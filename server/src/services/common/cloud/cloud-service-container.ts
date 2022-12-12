import { Storage } from "firebase-admin/storage";

export interface CloudServiceContainer {
  storage: Storage;
}
