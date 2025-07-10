import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useRegist } from '@/hooks/useRegist';
import { Alert } from '@/ui/Alert/Alert';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { PasswordInput } from '@/ui/PasswordInput';

import * as styles from './Register.module.scss';

export const RegisterPage = () => {
  const {
    data,
    errors,
    touched,
    loading,
    success,
    isFormValid,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useRegist({
    username: '',
    password: '',
    confirm_password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('isAuthenticated') === 'true') {
      navigate('/');
    }
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Register</h1>

      {success && <Alert type="success" message="Sign up success" duration={5000} />}

      <Input
        name="username"
        placeholder="Username"
        value={data.username}
        onChange={handleChange}
        onBlur={handleBlur}
        classname={touched.username && errors.username ? styles.inputError : ''}
        disabled={loading || success}
      />
      {touched.username && errors.username && (
        <p className={styles.errorMessage}>{errors.username}</p>
      )}

      <PasswordInput
        name="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
        onBlur={handleBlur}
        classname={touched.password && errors.password ? styles.inputError : ''}
        disabled={loading || success}
      />
      {touched.password && errors.password && (
        <p className={styles.errorMessage}>{errors.password}</p>
      )}

      <PasswordInput
        name="confirm_password"
        placeholder="Confirm Password"
        value={data.confirm_password}
        onChange={handleChange}
        onBlur={handleBlur}
        classname={touched.confirm_password && errors.confirm_password ? styles.inputError : ''}
        disabled={loading || success}
      />
      {touched.confirm_password && errors.confirm_password && (
        <p className={styles.errorMessage}>{errors.confirm_password}</p>
      )}

      <Button
        type="submit"
        className={styles.submitBtn}
        disabled={!isFormValid || loading || success}
        text={'Register'}
      />

      <Link to="/sign/login">Login</Link>
    </form>
  );
};
