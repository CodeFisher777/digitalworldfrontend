import React from 'react';
import axios from '../redux/axios';
import OrderBlock from '../components/OrderBlock';

const Orders: React.FC = () => {
  const [arrOrders, setArrOrders] = React.useState([]);

  React.useEffect(() => {
    //@ts-ignore
    axios.get('/orders').then(({ data }) => setArrOrders(data));
  }, []);

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">Заказы</h2>
        </div>
        <div className="content__items">
          {
            //@ts-ignore
            arrOrders.map((item) => (
              //@ts-ignore
              <OrderBlock key={item._id} orderRend={item.order} />
            ))
          }
        </div>
      </div>
    </div>
  );
};
export default Orders;
