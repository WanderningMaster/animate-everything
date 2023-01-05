import { AmqpService } from "~/services";

export interface FffmpegProcessCreatorDto {
  input: string;
  videoId: string;
  amqpService: AmqpService;
}
