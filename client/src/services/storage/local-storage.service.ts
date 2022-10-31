export type StorageKeys = "accessToken" | "refreshToken";

class LocalStorageService {
  save<T>(key: StorageKeys, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get<T>(key: StorageKeys): T | null {
    const data = localStorage.getItem(key);
    if (data === null) {
      return null;
    }
    return JSON.parse(data) as T;
  }

  remove(key: StorageKeys): void {
    localStorage.removeItem(key);
  }
}

export { LocalStorageService };
