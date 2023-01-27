export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
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
}
