import fastify from "fastify";

declare module "fastify" {
  export interface FastifyRequest extends fastify.FastifyRequest {
    user: { id: string };
  }
}