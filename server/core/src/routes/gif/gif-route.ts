import { FastifyInstance } from "fastify";
import { GifApiPath } from "shared/build";
import { gifController } from "~/controllers/controllers";
import { authHook } from "~/hooks/auth-hook";

export const GifRouter = async (instance: FastifyInstance): Promise<void> => {
  instance.route({
    method: "GET",
    url: GifApiPath.$ID,
    preHandler: authHook(true),
    handler: gifController.getOne,
  });
  instance.route({
    method: "POST",
    url: GifApiPath.ROOT,
    preHandler: authHook(false),
    handler: gifController.create,
  });
  instance.route({
    method: "POST",
    url: "/react",
    preHandler: authHook(false),
    handler: gifController.addReaction,
  });
  instance.route({
    method: "GET",
    url: GifApiPath.ROOT,
    handler: gifController.getAll,
    preHandler: authHook(true),
  });
  instance.route({
    method: "POST",
    url: "/upload",
    handler: gifController.processVideoAndReturnGif,
  });
};
