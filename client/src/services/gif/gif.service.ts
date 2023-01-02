import { Http } from "services/http/http.service";
import { ApiPath, ContentType, GifResponseDto, HttpMethod } from "shared/build";
import { CONFIG } from "../../config/config";

export class GifService {
  private readonly baseUrl: string;
  private http: Http;

  constructor(baseUrl: ApiPath, http: Http) {
    this.baseUrl = CONFIG.BASE_URL + baseUrl;
    this.http = http;
  }

  getAll(): Promise<(GifResponseDto & { isLiked: boolean })[]> {
    return this.http.load<(GifResponseDto & { isLiked: boolean })[]>(`${this.baseUrl}`);
  }

  getOne(id: string): Promise<GifResponseDto & { isLiked: boolean; likeCount: number }> {
    return this.http.load<GifResponseDto & { isLiked: boolean; likeCount: number }>(`${this.baseUrl}/${id}`);
  }

  async addReaction(payload: { gifId: string }): Promise<void> {
    await this.http.load<void>(`${this.baseUrl}/react`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
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
