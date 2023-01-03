import { Pagination } from "~/common/types/pagination/pagination-dto";

type GifGetAllRequestDto = Pagination & {
  userId?: string;
  search?: string;
};

export { GifGetAllRequestDto };
