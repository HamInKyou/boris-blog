import {PostDto} from "../dto/PostDto";
import {PaginationDto} from "../dto/PagenationDto";

export interface getPostRs extends PaginationDto{
  data: PostDto[];
}