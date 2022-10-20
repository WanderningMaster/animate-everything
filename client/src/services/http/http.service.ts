import { HttpError, checkIsOneOf, ContentType, HttpHeader, HttpMethod } from "shared/build";

export type HttpOptions = {
  method: HttpMethod;
  contentType: ContentType;
  payload: Record<string, unknown> | string;
};

class Http {
  public load<T = unknown>(url: string, options: Partial<HttpOptions> = {}): Promise<T> {
    const { method = HttpMethod.GET, payload = null, contentType } = options;
    const headers = this._getHeaders(contentType);
    const isJSON = checkIsOneOf(contentType, ContentType.JSON);

    return fetch(url, {
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
