import { Repository } from "typeorm";
import { Gif, Reaction } from "~/database/entity";
import { DefaultRequestParam, GifAddReactionRequestDto, GifCreateRequestDto, GifGetAllRequestDto } from "shared/build";
import { GifRepository } from "~/services/gif/port/gif-repository";

export class GifRepositoryAdapter implements GifRepository {
  private dataSource: {
    gif: Repository<Gif>;
    reaction: Repository<Reaction>;
  };

  constructor(dataSource: { gif: Repository<Gif>; reaction: Repository<Reaction> }) {
    this.dataSource = dataSource;
  }

  public getAll({ take, skip, userId }: GifGetAllRequestDto): Promise<Gif[]> {
    const query = userId
      ? [
          {
            author: {
              privacy: false,
            },
          },
          {
            author: {
              id: userId,
            },
          },
        ]
      : {
          author: {
            privacy: false,
          },
        };

    return this.dataSource.gif.find({
      take,
      skip,
      where: query,
      relations: {
        author: true,
        reactions: true,
      },
    });
  }

  public async getById({
    id,
    userId,
  }: DefaultRequestParam & { userId?: string }): Promise<{ gif: Gif | null; likeCount: number }> {
    const { gif, likeCount } = await this.dataSource.gif.manager.transaction(async (manager) => {
      const query = !userId
        ? {
            id,
            author: { privacy: false },
          }
        : [
            {
              id,
              author: { privacy: false },
            },
            {
              id,
              author: {
                id: userId,
              },
            },
          ];
      const gif = await manager.findOne(Gif, {
        where: query,
        relations: {
          author: true,
          reactions: true,
        },
      });
      const res = await manager.query("CALL COUNT_REACTIONS(?)", [id]);

      return {
        gif,
        likeCount: Number(res[0][0].count),
      };
    });
    console.log({ gif, likeCount });

    return {
      gif,
      likeCount,
    };
  }

  public async isAlreadyReacted({ authorId, gifId }: GifAddReactionRequestDto): Promise<boolean> {
    const isAlreadyReacted = await this.dataSource.reaction.findOne({
      where: {
        authorId,
        gifId,
      },
    });

    if (isAlreadyReacted) {
      return true;
    }

    return false;
  }

  public async addReaction({ authorId, gifId }: GifAddReactionRequestDto): Promise<Reaction | undefined> {
    const isAlreadyReacted = await this.isAlreadyReacted({ authorId, gifId });
    if (isAlreadyReacted) {
      await this.dataSource.reaction.delete({
        authorId,
        gifId,
      });
      return;
    }

    const reaction = await this.dataSource.reaction.save({
      authorId,
      gifId,
    });

    return reaction;
  }

  public async createOne(payload: GifCreateRequestDto): Promise<Gif> {
    const { id } = await this.dataSource.gif.save(payload);
    const createdGif = (await this.dataSource.gif.findOne({
      where: {
        id,
      },
      relations: {
        author: true,
      },
    })) as Gif;

    return createdGif;
  }
}
