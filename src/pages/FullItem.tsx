import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const FullItem: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
    text: string;
  }>();

  React.useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get(`http://localhost:4444/products/${id}`);
        setItem(data);
      } catch (error) {
        alert('Ошибка при получении 1 товара');
        navigate('/');
      }
    }
    fetchItem();
  }, []);

  if (!item) {
    return <>Загрузка</>;
  }
  return (
    <div className="full-item">
      <img src={item.imageUrl ? `http://localhost:4444${item.imageUrl}` : ''} />
      <div className="ful-name">
        <h2>{item.title}</h2>
        <h4>{item.price} р</h4>
      </div>

      <ReactMarkdown children={item.text} />

      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};
export default FullItem;
