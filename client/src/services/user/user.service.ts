import { Http } from "services/http/http.service";
import { ApiPath, HttpMethod, UserApiPath, UserResponseDto } from "shared/build";
import { CONFIG } from "../../config/config";

export class UserService {
  private readonly baseUrl: string;
  private http: Http;

  constructor(baseUrl: ApiPath, http: Http) {
    this.baseUrl = CONFIG.BASE_URL + baseUrl;
    this.http = http;
  }

  getAll(): Promise<UserResponseDto[]> {
    return this.http.load<UserResponseDto[]>(
      `${this.baseUrl}${UserApiPath.ROOT}`,
      {
        method: HttpMethod.GET,
      },
      [],
      [],
    );
  }

  getOne(id: string): Promise<UserResponseDto> {
    return this.http.load<UserResponseDto>(
      `${this.baseUrl}${UserApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}
