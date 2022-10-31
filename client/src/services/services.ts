import { ApiPath } from "shared/build";
import { Http } from "./http/http.service";
import { modifyAuthHeader } from "./http/interceptors/modify-auth-header";
import { LocalStorageService } from "./storage/local-storage.service";
import { UserService } from "./user/user.service";
import { AuthService } from "./auth/auth.service";
import { updateAccessToken } from "./http/interceptors/update-access-token";

export const _localStorage = new LocalStorageService();
export const http = new Http([modifyAuthHeader], [updateAccessToken]);

//apis
export const userService = new UserService(ApiPath.USER, http);
export const authService = new AuthService(ApiPath.USER, http);
