import React from 'react';
import styles from './OrderCompletedBlock.module.scss';
import { useSelector } from 'react-redux';
import { selectOrder } from '../../redux/order';

const OrderCompletedBlock: React.FC = () => {
  const orderNumber = useSelector(selectOrder);

  return (
    <div className={styles.root}>
      <h1>
        <span>👍</span>
        <br />
        Спасибо за ваш заказ!№ заказа {orderNumber}
      </h1>
    </div>
  );
};
export default OrderCompletedBlock;
