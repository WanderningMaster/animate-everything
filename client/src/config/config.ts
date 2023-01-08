type Config = {
  BASE_URL: string;
  CLIENT_URL: string;
};

const configure = (): Config => {
  const { REACT_APP_API_ORIGIN_URL, REACT_APP_CLIENT_URL } = process.env;

  return {
    BASE_URL: REACT_APP_API_ORIGIN_URL || "/api/v1",
    CLIENT_URL: REACT_APP_CLIENT_URL || "http://localhost:3000",
  };
};

export const CONFIG = configure();
