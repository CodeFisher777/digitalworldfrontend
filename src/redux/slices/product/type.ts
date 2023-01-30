export type FetchProductArgs = {
  category: String;
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
