import { Repository } from "typeorm";
import { Gif } from "~/database/entity";
import { DefaultRequestParam, GifCreateRequestDto, GifGetAllRequestDto } from "shared/build";
import { GifRepository } from "~/services/gif/port/gif-repository";

export class GifRepositoryAdapter implements GifRepository {
  private dataSource: Repository<Gif>;

  constructor(dataSource: Repository<Gif>) {
    this.dataSource = dataSource;
  }

  public getAll({ take, skip }: GifGetAllRequestDto): Promise<Gif[]> {
    return this.dataSource.find({
      take,
      skip,
      relations: {
        author: true,
      },
    });
  }

  public getById({ id }: DefaultRequestParam): Promise<Gif | null> {
    return this.dataSource.findOne({
      where: {
        id,
      },
      relations: {
        author: true,
      },
    });
  }

  public async createOne(payload: GifCreateRequestDto): Promise<Gif> {
    const gif = await this.dataSource.save(payload);
    // const createdGif = await this.dataSource.findOne({
    //   where: {
    //     id,
    //   },
    //   relations: {
    //     author: true,
    //   },
    // });

    return gif;
  }
}
