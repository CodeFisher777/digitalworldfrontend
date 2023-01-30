import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import qs from 'qs';

import { Categories, GameBlock, Skeleton } from '../components';
import { RootState } from '../redux/store';
import { selectFilter } from '../redux/slices/filter/selectors';
import { selectProduct } from '../redux/slices/product/selectors';
import { setCategoryId, setFilters } from '../redux/slices/filter/slice';
import { fetchProduct } from '../redux/slices/product/slice';
import { SerchProductParams } from '../redux/slices/filter/types';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const { categoryId } = useSelector(selectFilter);

  const { items, status } = useSelector(selectProduct);

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = React.useState(true);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const getProduct = async () => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    dispatch(
      fetchProduct({
        category,
      }),
    );
    setIsLoading(false);
  };

  React.useEffect(() => {
    if (
      window.location.search &&
      window.location.search !== '?sortProperty=rating&categoryId=0&currentPage=1'
    ) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SerchProductParams;

      dispatch(
        setFilters({
          categoryId: Number(params.category),
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scroll(0, 0);

    if (!isSearch.current) {
      getProduct();
    }
    isSearch.current = false;
  }, [categoryId]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId]);

  const pizzas = items.map((obj: any) => (
    <GameBlock
      key={obj._id}
      id={obj._id}
      title={obj.title}
      text={obj.text}
      price={obj.price}
      imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
    />
  ));
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
      </div>
      <h2 className="content__title">Все товары</h2>
      {status === 'error' ? (
        <div>ошибка при получении данных</div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
    </div>
  );
};
export default Home;
