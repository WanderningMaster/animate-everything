import { AmqpService } from "../common/amqp/application/amqp-service";
import { CloudService } from "../common/cloud/application/cloud-service";
import { GifRepository } from "./port/gif-repository";

export interface GifServiceContainer {
  gifRepository: GifRepository;
  cloudService: CloudService;
  amqpService: AmqpService;
}
