import { Http } from "services/http/http.service";
import {
  ApiPath,
  ContentType,
  GifCreateRequestDto,
  GifGetAllRequestDto,
  GifResponseDto,
  HttpMethod,
} from "shared/build";
import { CONFIG } from "../../config/config";

export class GifService {
  private readonly baseUrl: string;
  private http: Http;

  constructor(baseUrl: ApiPath, http: Http) {
    this.baseUrl = CONFIG.BASE_URL + baseUrl;
    this.http = http;
  }

  getAll(
    payload?: GifGetAllRequestDto,
  ): Promise<{ data: (GifResponseDto & { isLiked: boolean })[]; itemCount: number }> {
    return this.http.load<{ data: (GifResponseDto & { isLiked: boolean })[]; itemCount: number }>(`${this.baseUrl}`, {
      query: payload,
    });
  }

  getByAuthor(
    id: string,
    payload?: GifGetAllRequestDto,
  ): Promise<{ data: (GifResponseDto & { isLiked: boolean })[]; itemCount: number }> {
    return this.http.load<{ data: (GifResponseDto & { isLiked: boolean })[]; itemCount: number }>(
      `${this.baseUrl}/author/${id}`,
      {
        query: payload,
      },
    );
  }

  getFavorites(
    payload?: GifGetAllRequestDto,
  ): Promise<{ data: (GifResponseDto & { isLiked: boolean })[]; itemCount: number }> {
    return this.http.load<{ data: (GifResponseDto & { isLiked: boolean })[]; itemCount: number }>(
      `${this.baseUrl}/favorites`,
      {
        query: payload,
      },
    );
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
    return this.http.load<{ res: string }>(`${this.baseUrl}/upload`, {
      method: HttpMethod.POST,
      payload: data,
    });
  }

  create(payload: Omit<GifCreateRequestDto, "authorId">): Promise<GifResponseDto & { isLiked: boolean }> {
    return this.http.load<GifResponseDto & { isLiked: boolean }>(`${this.baseUrl}`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }
}
