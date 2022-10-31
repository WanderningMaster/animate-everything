export type PostInterceptorOptions = {
  response: Response;
  initialRequest: {
    url: string;
    options: RequestInit;
  }
  makeRequestFn: (url: string, options: RequestInit) => Promise<Response>;
};

export type PreInterceptorOptions = {
  url: string;
  options: RequestInit;
};

export type PreInterceptor = {
  (params: PreInterceptorOptions): Promise<[string, RequestInit]>;
};

export type PostInterceptor = {
  (params: PostInterceptorOptions): Promise<Response>;
};
