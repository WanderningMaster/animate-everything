import { HttpOptions } from "../http.service";

export type InterceptorOptions = {
  url: string;
  options: Partial<HttpOptions>;
  headers: Headers;
};

export type Interceptor = {
  (params: InterceptorOptions): Promise<InterceptorOptions>;
};
