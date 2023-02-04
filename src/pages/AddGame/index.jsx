import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFullName, selectIsAuth } from '../../redux/auth';
import axios from '../../redux/axios';

import 'easymde/dist/easymde.min.css';
import styles from './AddGame.module.scss';

const AddGame = () => {
  const userData = useSelector(selectFullName);
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [rating, setRating] = React.useState('');
  const [category, setCategory] = React.useState('');

  const inputFileRef = React.useRef(null);
  const isEditing = Boolean(id);
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const fields = {
        title,
        imageUrl,
        text,
        price,
        rating,
        category,
      };
      const { data } = isEditing
        ? await axios.patch(`/products/${id}`, fields)
        : await axios.post('/products', fields);
      const _id = isEditing ? id : data._id;
      navigate(`/products/${_id}`);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при  создании продукта');
    }
  };
  React.useEffect(() => {
    if (id) {
      axios
        .get(`/products/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setCategory(data.category);
          setRating(data.rating);
          setPrice(data.price);
        })

        .catch((err) => {
          console.warn(err);
          alert('Ошибка при получении продукта на редактирование');
        });
    }
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (isAuth) {
    if (userData._id === '63d10308858f5e5862e53d22') {
      return (
        <Paper style={{ padding: 30 }}>
          <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
            Загрузить картинку
          </Button>
          <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
          {imageUrl && (
            <>
              <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                Удалить
              </Button>
              <img
                className={styles.image}
                src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
                alt="Uploaded"
              />
            </>
          )}

          <br />
          <br />
          <TextField
            classes={{ root: styles.title }}
            variant="standard"
            placeholder="Название продукта"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            classes={{ root: styles.tags }}
            variant="standard"
            placeholder="Цена"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            classes={{ root: styles.tags }}
            variant="standard"
            placeholder="Категория"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            classes={{ root: styles.tags }}
            variant="standard"
            placeholder="Рэйтинг"
            fullWidth
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
          <div className={styles.buttons}>
            <Button onClick={onSubmit} size="large" variant="contained">
              {isEditing ? 'Сохранить' : 'Опубликовать'}
            </Button>
            <a href="/">
              <Button size="large">Отмена</Button>
            </a>
          </div>
        </Paper>
      );
    } else return <Navigate to="/" />;
  }
};
export default AddGame;
