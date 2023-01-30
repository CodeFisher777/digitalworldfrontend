export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = '1',
  PRICE_ASC = '-1',
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
  categoryId: number;
}
