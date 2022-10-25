import { Http } from "services/http/http.service";
import {
  ApiPath,
  ContentType,
  HttpMethod,
  JwtPair,
  UserApiPath,
  UserCreateRequestDto,
  UserResponseDto,
} from "shared/build";
import { CONFIG } from "../../config/config";

export class AuthService {
  private readonly baseUrl: string;
  private http: Http;

  constructor(baseUrl: ApiPath, http: Http) {
    this.baseUrl = CONFIG.BASE_URL + baseUrl;
    this.http = http;
  }

  signUp(payload: UserCreateRequestDto): Promise<UserResponseDto> {
    return this.http.load<UserResponseDto>(
      `${this.baseUrl}${UserApiPath.SIGN_UP}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
      [],
      [],
    );
  }

  signIn(payload: Omit<UserCreateRequestDto, "username">): Promise<UserResponseDto & JwtPair> {
    return this.http.load<UserResponseDto & JwtPair>(
      `${this.baseUrl}${UserApiPath.SIGN_IN}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
      [],
      [],
    );
  }

  signOut(): Promise<boolean> {
    return this.http.load<boolean>(
      `${this.baseUrl}${UserApiPath.SIGN_OUT}`,
      {
        method: HttpMethod.POST,
      },
    );
  }

  refresh(token: string): Promise<JwtPair> {
    return this.http.load<JwtPair>(
      `${this.baseUrl}${UserApiPath.REFRESH}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify({ token }),
      },
      [],
      [],
    );
  }

  me(): Promise<UserResponseDto> {
    return this.http.load<UserResponseDto>(
      `${this.baseUrl}${UserApiPath.ME}`,
    );
  }
}
