import { ApiPath } from "shared/build";
import { CONFIG } from "~/configuration/config";

export const createApiPath = (path: ApiPath): string => `${CONFIG.APP.API_BASE_PREFIX}${path}`;