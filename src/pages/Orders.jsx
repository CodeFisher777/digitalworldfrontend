import React from 'react';

import axios from '../redux/axios';
import OrderBlock from '../components/OrderBlock';

const Orders = () => {
  const [arrOrders, setArrOrders] = React.useState([]);

  React.useEffect(() => {
    axios.get('/orders').then(({ data }) => setArrOrders(data));
  }, []);

  return (
    <div className="container_order">
      <div className="cart">
        <div className="content__items_order">
          {arrOrders.reverse().map((item) => (
            <OrderBlock key={item._id} orderRend={item.order} value={item.numberOrder} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Orders;
