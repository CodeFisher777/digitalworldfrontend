import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import qs from 'qs';
import {
  FilterSliceState,
  selectFilter,
  SerchProductParams,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchProduct, FetchProductArgs, selectProduct } from '../redux/slices/productSlice';

import { sortList } from '../components/Sort';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { RootState } from '../redux/store';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const { categoryId, currentPage, searchValue } = useSelector(selectFilter);

  const sortType = useSelector((state: RootState) => state.filter.sort.sortProperty);
  const { items, status } = useSelector(selectProduct);

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = React.useState(true);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const getProduct = async () => {
    setIsLoading(true);
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      fetchProduct({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
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
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
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
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все товары</h2>
      {status === 'error' ? (
        <div>ошибка при получении данных</div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
