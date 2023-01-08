import { AmqpService } from "~/services";

export interface FffmpegProcessCreatorDto {
  input: string;
  videoId: string;
  crop: { left: number; right: number };
  amqpService: AmqpService;
}
