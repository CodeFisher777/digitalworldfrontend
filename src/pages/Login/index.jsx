import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import styles from './Login.module.scss';
import { fetchAuth, selectIsAuth, selectFullName, setMaster } from '../../redux/auth';

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(selectFullName);
  const dispatch = useDispatch();
  if (isAuth && userData._id === '63d10308858f5e5862e53d22') {
    dispatch(setMaster(true));
  }
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert('Не удалось авторизоваться');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } else {
      alert('Ре удалось авторизоваться');
    }
    dispatch(fetchAuth(values));
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField
          {...register('password', { required: 'Укажите пароль' })}
          className={styles.field}
          helperText={errors.password?.message}
          label="Пароль"
          fullWidth
          error={Boolean(errors.password?.message)}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
      <Link to="/registration">
        <p className={styles.registr}>Зарегистрироваться</p>
      </Link>
    </Paper>
  );
};
