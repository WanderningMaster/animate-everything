import { _localStorage } from "services/services";
import { PreInterceptor } from "./interceptors";

export const modifyAuthHeader: PreInterceptor = ({ options, url }) => {
  const accessToken = _localStorage.get<string>("accessToken");
  const headers = options.headers as Headers;
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return Promise.resolve([
    url,
    options,
  ]);
};
