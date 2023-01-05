import { UserRouter } from "./user/user-route";
import { ApiPath } from "shared/build";
import { createApiPath } from "~/utils/utils";
import { GifRouter } from "./gif/gif-route";

export const routes = [
  {
    router: UserRouter,
    prefix: createApiPath(ApiPath.USER),
  },
  {
    router: GifRouter,
    prefix: createApiPath(ApiPath.GIF),
  },
];
