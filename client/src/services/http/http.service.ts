import { PostInterceptor, PreInterceptor } from "./interceptors/interceptors";
import { ContentType, HttpError, HttpHeader, HttpMethod } from "shared/build";

export type HttpOptions = {
  method: HttpMethod;
  contentType: ContentType;
  payload: BodyInit | null;
};

class Http {
  constructor(
    private preInterceptors: PreInterceptor[],
    private postInterceptors: PostInterceptor[]) {
  }

  public async load<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
    preInterceptors = this.preInterceptors,
    postInterceptors = this.postInterceptors,
  ): Promise<T> {
    const { method = HttpMethod.GET, payload = null, contentType } = options;
    const headers = this._getHeaders(contentType);

    let requestOptions: RequestInit = {
      method,
      headers,
      body: payload,
    };

    for (const preInterceptor of preInterceptors) {
      [url, requestOptions] = await preInterceptor({ url, options: requestOptions });
    }

    const makeRequest = (url: string, options: RequestInit): Promise<Response> => fetch(url, options);
    let response = await makeRequest(url, requestOptions);

    for (const postInterceptor of postInterceptors) {
      response = await postInterceptor({
        initialRequest: { options: requestOptions, url },
        makeRequestFn: makeRequest,
        response,
      });
    }

    return this._checkStatus(response)
      .then((res) => this._parseJSON<T>(res))
      .catch(this._throwError);
  }

  private _getHeaders(contentType?: ContentType): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    headers.append("Access-Control-Allow-Origin", "*");
    return headers;
  }

  private async _checkStatus(response: Response): Promise<Response> {
    if (!response.ok) {
      throw new HttpError({
        status: response.status,
      });
    }

    return response;
  }

  private _parseJSON<T>(response: Response): Promise<T> {
    return response.json();
  }

  private _throwError(err: Error): never {
    throw err;
  }
}

export { Http };
