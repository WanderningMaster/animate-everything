import { ApiPath } from "shared/build";
import { CONFIG } from "~/configuration/config";

export const createApiPath = (path: ApiPath) => `${CONFIG.APP.API_BASE_PREFIX}${path}`;