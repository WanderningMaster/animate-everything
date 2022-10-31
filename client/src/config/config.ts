type Config = {
  BASE_URL: string;
};

const configure = (): Config => {
  const { REACT_APP_API_ORIGIN_URL } = process.env;

  return {
    BASE_URL: REACT_APP_API_ORIGIN_URL || "/api/v1",
  };
};

export const CONFIG = configure();
