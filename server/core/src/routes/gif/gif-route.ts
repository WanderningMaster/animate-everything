import { FastifyInstance } from "fastify";
import { GifApiPath } from "shared/build";
import { gifController } from "~/controllers/controllers";
import { authHook } from "~/hooks/auth-hook";

export const GifRouter = async (instance: FastifyInstance): Promise<void> => {
  instance.route({
    method: "GET",
    url: GifApiPath.$ID,
    handler: gifController.getOne,
  });
  instance.route({
    method: "POST",
    url: GifApiPath.ROOT,
    preHandler: authHook,
    handler: gifController.create,
  });
  instance.route({
    method: "GET",
    url: GifApiPath.ROOT,
    handler: gifController.getAll,
  });
};
