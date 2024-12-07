export interface Meta {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage?: number;
  nextPage?: number;
  pageCount: number;
  totalCount: number;
}
