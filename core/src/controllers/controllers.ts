import { UserController } from "~/controllers/user/user.controller";
import { GifController } from "./gif/gif.controller";

export const userController = new UserController();
export const gifController = new GifController();
