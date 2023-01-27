import React from 'react';
import styles from './OrderCompletedBlock.module.scss';

const OrderCompletedBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>👍</span>
        <br />
        Спасибо за ваш заказ!№ заказа ____
      </h1>
    </div>
  );
};
export default OrderCompletedBlock;
