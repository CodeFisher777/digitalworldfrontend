import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFullName, selectIsAuth } from '../../redux/auth';
import axios from '../../redux/axios';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const userData = useSelector(selectFullName);
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [rating, setRating] = React.useState('');
  const [category, setCategory] = React.useState('');

  const inputFileRef = React.useRef(null);

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
      const { data } = await axios.post('/products', fields);
      const id = data._id;
      navigate(`/products/${id}`);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при  создании статьи');
    }
  };

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
            Загрузить превью
          </Button>
          <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
          {imageUrl && (
            <>
              <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                Удалить
              </Button>
              <img
                className={styles.image}
                src={`http://localhost:4444${imageUrl}`}
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
              Опубликовать
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