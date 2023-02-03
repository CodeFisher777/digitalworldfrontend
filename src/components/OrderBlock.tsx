import React from 'react';
type OrdersBlockProps = {
  value: number;
  orderRend: string;
};

const OrderBlock: React.FC<OrdersBlockProps> = ({ orderRend, value }) => {
  return (
    <p>
      {' '}
      Заказ № {value} {orderRend}
    </p>
  );
};
export default OrderBlock;
