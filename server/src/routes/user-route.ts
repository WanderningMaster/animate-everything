import { FastifyInstance } from "fastify";
import { UserApiPath } from "shared/build";
import { userController } from "~/controllers/controllers";

export const UserRouter = async (instance: FastifyInstance) => {
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
};