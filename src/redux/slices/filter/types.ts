export enum SortPropertyEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export type SortType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export type SerchProductParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortType;
  sortDirection: Boolean;
}
