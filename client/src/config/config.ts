type Config = {
  BASE_URL: string;
};

const configure = (): Config => {
  const { REACT_APP_API_ORIGIN_URL } = process.env;

  return {
    BASE_URL: REACT_APP_API_ORIGIN_URL || "http://localhost:5001/api/v1",
  };
};

export const CONFIG = configure();
