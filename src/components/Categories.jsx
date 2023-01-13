import React from 'react';

const Categories = ({ value, onClickCategory }) => {
  const categories = [
    'Все',
    'Компьютеры',
    'Бытовая техника',
    'Телевизоры',
    'Проекторы',
    'Автотовары',
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Categories;
