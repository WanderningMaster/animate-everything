export type StorageKeys = "accessToken" | "refreshToken";

class LocalStorageService {
  save<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get<T>(key: StorageKeys): T | null {
    const data = localStorage.getItem(key);
    if (data === null) {
      return null;
    }
    return JSON.parse(data) as T;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}

export { LocalStorageService };
