import { Http } from "services/http/http.service";
import { ApiPath, HttpMethod } from "shared/build";
import { CONFIG } from "../../config/config";

export class GifService {
  private readonly baseUrl: string;
  private http: Http;

  constructor(baseUrl: ApiPath, http: Http) {
    this.baseUrl = CONFIG.BASE_URL + baseUrl;
    this.http = http;
  }

  upload(data: FormData): Promise<{ res: string }> {
    return this.http.load<{ res: string }>(
      `${this.baseUrl}/upload`,
      {
        method: HttpMethod.POST,
        payload: data,
      },
      [],
      [],
    );
  }
}
