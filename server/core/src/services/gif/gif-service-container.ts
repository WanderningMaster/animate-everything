import { GifRepository } from "./port/gif-repository";

export interface GifServiceContainer {
  gifRepository: GifRepository;
}
