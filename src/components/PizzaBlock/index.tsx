import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';
import { selectIsAuth, selectFullName, selectMaster, setMaster } from '../../redux/auth';

import { selectCartItemById } from '../../redux/slices/cart/selectors';
import { addItem } from '../../redux/slices/cart/slice';
import { CartItem } from '../../redux/slices/cart/types';
import { fetchRemoveProduct } from '../../redux/slices/product/slice';

type PizzaBlockProps = {
  id: string;
  text: string;
  title: string;
  price: number;
  imageUrl: string;
};
const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, price, imageUrl }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector(selectCartItemById(id));
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(selectFullName);
  const isMaster = useSelector(selectMaster);

  if (isAuth && userData._id === '63d10308858f5e5862e53d22') {
    dispatch(setMaster(true));
  }

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить продукт?'))
      //@ts-ignore
      dispatch(fetchRemoveProduct(id));
  };

  const addedCount = cartItem ? cartItem.count : 0;

  const onAddItem = () => {
    const user = isAuth ? userData.fullName : '';
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      count: 0,
      user,
    };
    dispatch(addItem(item));
  };
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/products/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>

        {isMaster ? (
          <>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={onClickRemove} color="secondary">
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          <></>
        )}

        <div className="pizza-block__bottom">
          <div className="pizza-block__price">цена: {price} ₽</div>
          <button onClick={onAddItem} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i> {addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PizzaBlock;
