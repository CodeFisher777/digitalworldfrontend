export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  count: number;
  user: string;
};
export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
