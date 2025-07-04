import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useLogin } from '@/hooks/useLogin';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { PasswordInput } from '@/ui/PasswordInput';

import * as styles from './Register.module.scss';

export const LoginPage = () => {
  const { data, loading, success, isFormValid, handleChange, handleSubmit } = useLogin({
    username: '',
    password: '',
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (success) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 3.33;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [success]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Login</h1>

      {success && (
        <>
          <p className={styles.successMessage}>Sign in success!</p>
          <div className={styles.progressBarWrapper}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
          </div>
        </>
      )}

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
