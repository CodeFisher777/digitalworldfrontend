import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import qs from 'qs';
import { sortList } from '../components/Sort';
import { Categories, Sort, GameBlock, Skeleton, Pagination } from '../components';
import { RootState } from '../redux/store';
import { selectFilter, selectSortDirection } from '../redux/slices/filter/selectors';
import { selectProduct } from '../redux/slices/product/selectors';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filter/slice';
import { fetchProduct } from '../redux/slices/product/slice';
import { SerchProductParams } from '../redux/slices/filter/types';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const { categoryId, currentPage, searchValue } = useSelector(selectFilter);
  const sortType = useSelector((state: RootState) => state.filter.sort);
  const { items, status } = useSelector(selectProduct);
  const directionSort = useSelector(selectSortDirection);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  let dir = null;
  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const direction = directionSort ? '-1' : '1';
  const getProduct = async () => {
    setIsLoading(true);
    const sortBy = sortType.sortProperty;
    const direction = directionSort ? '-1' : '1';
    const category = `category=${categoryId}`;
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      fetchProduct({
        sortBy,
        direction,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
    setIsLoading(false);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SerchProductParams;
      const keys = Object.keys(params);
      const objKeys = {
        sortProperty: keys[1],
      };
      const sort = sortList.find((obj) => obj.sortProperty === objKeys.sortProperty);

      //параметры для запроса при фильтрации -1 и 1, дикий костыль

      if (window.location.search.includes('-1')) {
        dispatch(
          setFilters({
            categoryId: Number(params.category),
            sort: sort || sortList[0],
            sortDirection: false,
            currentPage: Number(params.currentPage),
            searchValue: '',
          }),
        );
      } else {
        dispatch(
          setFilters({
            categoryId: Number(params.category),
            sort: sort || sortList[0],
            sortDirection: true,
            currentPage: Number(params.currentPage),
            searchValue: '',
          }),
        );
      }
    } else {
      getProduct();
    }
    isSearch.current = true;
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        category: categoryId,
        sort: sortType.sortProperty,
        dir: direction,
        currentPage: currentPage,
      });
      const queryStringRep = queryString.replace('sort=', '').replace('&dir', '');
      navigate(`?${queryStringRep}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, direction, currentPage, searchValue]);

  React.useEffect(() => {
    window.scroll(0, 0);
    getProduct();
    if (!isSearch.current) {
      getProduct();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage, directionSort]);

  const games = items.map((obj: any) => (
    <GameBlock
      key={obj._id}
      id={obj._id}
      title={obj.title}
      text={obj.text}
      price={obj.price}
      imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
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
        <div className="content__items">{status === 'loading' ? skeletons : games}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
