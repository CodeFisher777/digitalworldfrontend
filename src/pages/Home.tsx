import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import qs from 'qs';
import { sortList } from '../components/Sort';
import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components';
import { RootState } from '../redux/store';
import { selectFilter } from '../redux/slices/filter/selectors';
import { selectProduct } from '../redux/slices/product/selectors';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filter/slice';
import { fetchProduct } from '../redux/slices/product/slice';
import { SerchProductParams } from '../redux/slices/filter/types';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const { categoryId, currentPage, searchValue } = useSelector(selectFilter);

  const sortType = useSelector((state: RootState) => state.filter.sort);
  const { items, status } = useSelector(selectProduct);

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = React.useState(true);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const getProduct = async () => {
    setIsLoading(true);
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
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

  const pizzas = items.map((obj: any) => (
    <PizzaBlock
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
        <Sort value={sortType} />
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
