import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSort, selectSortDirection } from '../redux/slices/filter/selectors';
import { setSort, setSortDirection } from '../redux/slices/filter/slice';
import { SortPropertyEnum, SortType } from '../redux/slices/filter/types';
import down from '../assets/img/arrow_down.png';
import up from '../assets/img/arrow_up.png';
type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};
type SortProps = {
  value: SortType;
};
export const sortList: SortItem[] = [
  { name: 'популярности ', sortProperty: SortPropertyEnum.RATING },
  { name: 'цене ', sortProperty: SortPropertyEnum.PRICE },
  { name: 'алфавиту ', sortProperty: SortPropertyEnum.TITLE },
];

const Sort: React.FC<SortProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);

  const direction = useSelector(selectSortDirection);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [activePopup, setActivePopup] = React.useState(false);

  const onClickSortList = (obj: SortItem) => {
    dispatch(setSort(obj));
    setActivePopup(false);
  };

  const onClickSortdirection = () => {
    dispatch(setSortDirection(true));
    dispatch(setSortDirection(!direction));
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as MouseEvent & { path: Node[] };
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setActivePopup(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        {direction ? (
          <img onClick={onClickSortdirection} width="20" height="20" src={down} />
        ) : (
          <img onClick={onClickSortdirection} width="20" height="20" src={up} />
        )}

        <b>Сортировка по:</b>
        <span onClick={() => setActivePopup(!activePopup)}>{value.name}</span>
      </div>

      {activePopup && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => {
                  onClickSortList(obj);
                }}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
export default Sort;
