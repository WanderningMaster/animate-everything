import { _localStorage } from "services/services";
import { Interceptor, InterceptorOptions } from "./interceptors";
export const modifyAuthHeader: Interceptor = async ({ options, url, headers }): Promise<InterceptorOptions> => {
  const accessToken = _localStorage.get("accessToken");
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return {
    url,
    options,
    headers,
  };
};
