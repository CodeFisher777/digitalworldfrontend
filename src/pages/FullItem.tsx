import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullItem: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  React.useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get(`https://63ba93254482143a3f2ab5bc.mockapi.io/items/${id}`);
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
      <img src={item.imageUrl} />
      <div className="ful-name">
        <h2>{item.title}</h2>
        <h4>{item.price} р</h4>
      </div>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quibusdam officiis
        repudiandae in alias id, consectetur deserunt quia rerum adipisci ducimus unde, praesentium
        voluptatem saepe beatae dolor, ratione iusto accusamus!
      </p>
    </div>
  );
};
export default FullItem;
