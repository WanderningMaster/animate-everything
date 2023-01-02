import { FastifyInstance } from "fastify";
import { UserApiPath } from "shared/build";
import { userController } from "~/controllers/controllers";
import { authHook } from "~/hooks/auth-hook";
import {
  createUserSchema,
  getAllUserSchema,
  getMeSchema,
  getOneUserSchema,
  refreshSchema,
  signInSchema,
  signOutSchema,
  signUpSchema,
} from "~/routes/user/schema";

export const UserRouter = async (instance: FastifyInstance): Promise<void> => {
  instance.route({
    method: "GET",
    url: UserApiPath.$ID,
    schema: {
      ...getOneUserSchema,
    },
    handler: userController.getOne,
    preHandler: authHook(false), //FIXME: added only for test purposes and should be removed in future
  });
  instance.route({
    method: "GET",
    url: UserApiPath.ROOT,
    schema: {
      ...getAllUserSchema,
    },
    handler: userController.getAll,
  });
  instance.route({
    method: "POST",
    url: UserApiPath.ROOT,
    schema: {
      ...createUserSchema,
    },
    handler: userController.create,
  });

  instance.route({
    method: "POST",
    url: UserApiPath.SIGN_IN,
    schema: {
      ...signInSchema,
    },
    handler: userController.signIn,
  });
  instance.route({
    method: "POST",
    url: UserApiPath.SIGN_UP,
    schema: {
      ...signUpSchema,
    },
    handler: userController.signUp,
  });
  instance.route({
    preHandler: authHook(false),
    method: "POST",
    url: UserApiPath.SIGN_OUT,
    schema: {
      ...signOutSchema,
    },
    handler: userController.signOut,
  });
  instance.route({
    preHandler: authHook(false),
    method: "GET",
    url: UserApiPath.ME,
    schema: {
      ...getMeSchema,
    },
    handler: userController.me,
  });
  instance.route({
    method: "POST",
    url: UserApiPath.REFRESH,
    schema: {
      ...refreshSchema,
    },
    handler: userController.refresh,
  });

  instance.route({
    method: "PUT",
    url: "/avatar",
    handler: userController.updateAvatar,
    preHandler: authHook(false),
  });

  instance.route({
    method: "PUT",
    url: "/profile",
    handler: userController.updateProfile,
    preHandler: authHook(false),
  });
};
