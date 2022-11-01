import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import { ApiPath } from "shared/build";

export const swaggerOpts: FastifySwaggerUiOptions = {
  routePrefix: ApiPath.DOCS,
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function(request, reply, next) {
      next();
    },
    preHandler: function(request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
};