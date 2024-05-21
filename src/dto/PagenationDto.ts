export interface PaginationDto{
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
}