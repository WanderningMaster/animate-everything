import { PostInterceptor } from "./interceptors";
import { HttpCode } from "shared/build";
import { _localStorage, authService } from "../../services";
import { modifyAuthHeader } from "./modify-auth-header";

export const updateAccessToken: PostInterceptor = async ({
                                                           initialRequest: { options, url },
                                                           response,
                                                           makeRequestFn,
                                                         }): Promise<Response> => {
  if (response.status !== HttpCode.UNAUTHORIZED) {
    return Promise.resolve(response);
  }

  const token = _localStorage.get<string>("refreshToken");
  if (!token) {
    return Promise.resolve(response);
  }
  try {
    const { accessToken, refreshToken } = await authService.refresh(token);

    _localStorage.save<string>("accessToken", accessToken);
    _localStorage.save<string>("refreshToken", refreshToken);

    const newOptions = (await modifyAuthHeader({ options, url }))[1];
    const newResponse = await makeRequestFn(url, newOptions);

    return newResponse;
  } catch (e: unknown) {
    _localStorage.remove("accessToken");
    _localStorage.remove("refreshToken");

    throw e;
  }
};