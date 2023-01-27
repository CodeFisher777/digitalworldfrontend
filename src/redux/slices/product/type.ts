export type FetchProductArgs = {
  sortBy: String;
  order: String;
  category: String;
  search: String;
  currentPage: String;
};

export type ProductItem = {
  _id: string;
  title: string;
  text: string;
  price: number;
  imageUrl: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error',
}

export interface ProductSliceState {
  items: ProductItem[];
  status: Status;
}
