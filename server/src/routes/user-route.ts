import { FastifyInstance } from "fastify";
import { UserApiPath } from "shared/build";
import { userController } from "~/controllers/controllers";
import { authHook } from "~/hooks/auth-hook";

export const UserRouter = async (instance: FastifyInstance): Promise<void> => {
  instance.route({
    method: "GET",
    url: UserApiPath.$ID,
    handler: userController.getOne,
    preHandler: authHook, //FIXME: added only for test purposes and should be removed in future
  });
  instance.route({
    method: "GET",
    url: UserApiPath.ROOT,
    handler: userController.getAll,
  });
  instance.route({
    method: "POST",
    url: UserApiPath.ROOT,
    handler: userController.create,
  });

  instance.route({
    method: "POST",
    url: UserApiPath.SIGN_IN,
    handler: userController.signIn,
  });
  instance.route({
    method: "POST",
    url: UserApiPath.SIGN_UP,
    handler: userController.signUp,
  });
  instance.route({
    preHandler: authHook,
    method: "POST",
    url: UserApiPath.SIGN_OUT,
    handler: userController.signOut,
  });
};