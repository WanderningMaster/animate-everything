import { Http } from "services/http/http.service";
import { ApiPath, HttpMethod, JwtPair, UserApiPath, UserCreateRequestDto, UserResponseDto } from "shared/build";

export class AuthService {
  private readonly baseUrl: ApiPath;
  private http: Http;

  constructor(baseUrl: ApiPath, http: Http) {
    this.baseUrl = baseUrl;
    this.http = http;
  }

  signUp(payload: UserCreateRequestDto): Promise<UserResponseDto> {
    return this.http.load<UserResponseDto>(
      `${this.baseUrl}${UserApiPath.SIGN_UP}`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(payload),
      },
      [],
    );
  }

  signIn(payload: Omit<UserCreateRequestDto, "username">): Promise<UserResponseDto & JwtPair> {
    return this.http.load<UserResponseDto & JwtPair>(
      `${this.baseUrl}${UserApiPath.SIGN_IN}`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(payload),
      },
      [],
    );
  }

  signOut(): Promise<boolean> {
    return this.http.load<boolean>(
      `${this.baseUrl}${UserApiPath.SIGN_OUT}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  refresh(token: string): Promise<JwtPair> {
    return this.http.load<JwtPair>(
      `${this.baseUrl}${UserApiPath.REFRESH}`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify({ token }),
      },
    );
  }

  me(): Promise<UserResponseDto> {
    return this.http.load<UserResponseDto>(
      `${this.baseUrl}${UserApiPath.ME}`,
    );
  }
}
