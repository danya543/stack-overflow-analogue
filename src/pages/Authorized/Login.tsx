import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLogin } from '@/hooks/useLogin';
import { Alert } from '@/ui/Alert/Alert';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { PasswordInput } from '@/ui/PasswordInput';

import * as styles from './Register.module.scss';

export const LoginPage = () => {
  const { data, loading, success, isFormValid, handleChange, handleSubmit } = useLogin({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('isAuthenticated') === 'true') {
      navigate('/');
    }
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Login</h1>

      {success && <Alert type="success" message="Sign in success" />}

      <Input
        name="username"
        placeholder="Username"
        value={data.username}
        onChange={handleChange}
        disabled={loading || success}
      />

      <PasswordInput
        name="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
        disabled={loading || success}
      />

      <Button
        type="submit"
        className={styles.submitBtn}
        disabled={!isFormValid || loading || success}
        text={'Login'}
      />

      <Link to={'/sign/register'}>Register</Link>
    </form>
  );
};
