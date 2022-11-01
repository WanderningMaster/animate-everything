import { UserRouter } from "./user/user-route";
import { ApiPath } from "shared/build";
import { createApiPath } from "~/utils/utils";

export const routes = [
  {
    router: UserRouter,
    prefix: createApiPath(ApiPath.USER),
  },
];