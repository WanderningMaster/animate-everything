import { config } from "dotenv";

export interface ServerConfig {
  ffmpegPath: string;
  rabbitmqUrl: string;
  outputPath: string;
}

const configuration = (): ServerConfig => {
  config();

  const { FFMPEG_PATH, RABBITMQ_HOST, RABBITMQ_PORT, OUTPUT_PATH } = process.env;

  return {
    ffmpegPath: FFMPEG_PATH || "/usr/bin/ffmpeg",
    rabbitmqUrl: `amqp://${RABBITMQ_HOST || "localhost"}:${Number(RABBITMQ_PORT) || 5672}`,
    outputPath: OUTPUT_PATH || "/output",
  };
};

export const CONFIG = configuration();
