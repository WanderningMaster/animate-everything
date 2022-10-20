import { CONFIG } from "config/config";
import { Interceptor } from "./interceptors/interceptors";
import { HttpError, checkIsOneOf, ContentType, HttpHeader, HttpMethod } from "shared/build";

export type HttpOptions = {
  method: HttpMethod;
  contentType: ContentType;
  payload: Record<string, unknown> | string;
};

class Http {
  constructor(private preInterceptors: Interceptor[]) {}

  public async load<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
    preInterceptors = this.preInterceptors,
  ): Promise<T> {
    const { method = HttpMethod.GET, payload = null, contentType } = options;
    let headers = this._getHeaders(contentType);
    const isJSON = checkIsOneOf(contentType, ContentType.JSON);

    for (const preInterceptor of preInterceptors) {
      const modifiedOpts = await preInterceptor({ url, options, headers });
      headers = modifiedOpts.headers;
      url = modifiedOpts.url;
      options = modifiedOpts.options;
    }

    return fetch(`${CONFIG.BASE_URL}${url}`, {
      method,
      headers,
      body: isJSON ? JSON.stringify(payload) : (payload as string),
    })
      .then(this._checkStatus)
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

  private _checkStatus(response: Response): Response {
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
