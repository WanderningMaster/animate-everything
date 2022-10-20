import { Http } from "./http/http.service";
import { modifyAuthHeader } from "./http/interceptors/modify-auth-header";
import { LocalStorageService } from "./storage/local-storage.service";

export const _localStorage = new LocalStorageService();
export const http = new Http([modifyAuthHeader]);
