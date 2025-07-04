import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { registerUser } from '@/api/register';

interface RegistData {
  username: string;
  password: string;
  confirm_password: string;
}

interface Errors {
  username: string;
  password: string;
  confirm_password: string;
}

export const useRegist = (initialValues: RegistData) => {
  const [data, setData] = useState(initialValues);
  const [touched, setTouched] = useState<Record<keyof RegistData, boolean>>({
    username: false,
    password: false,
    confirm_password: false,
  });
  const [errors, setErrors] = useState<Errors>({
    username: '',
    password: '',
    confirm_password: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const getFieldError = (name: keyof RegistData, value: string): string => {
    if (name === 'username') {
      if (value.length === 0) return '';
      if (value.length < 5) {
        return 'Name must contain at least 5 symbols';
      }
    }

    if (name === 'password') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
      if (!passwordRegex.test(value)) {
        return 'Password must contain at least one capital letter, one letter, one special symbol, one number';
      }
    }

    if (name === 'confirm_password' && value !== data.password) {
      return "Passwords don't match";
    }

    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };

      if (name === 'password' && touched.confirm_password) {
        const confirmError = getFieldError('confirm_password', newData.confirm_password);
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirm_password: confirmError,
        }));
      }

      return newData;
    });

    if (touched[name as keyof RegistData]) {
      const error = getFieldError(name as keyof RegistData, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = getFieldError(name as keyof RegistData, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const usernameError = getFieldError('username', data.username);
    const passwordError = getFieldError('password', data.password);
    const confirmPasswordError = getFieldError('confirm_password', data.confirm_password);

    setErrors({
      username: usernameError,
      password: passwordError,
      confirm_password: confirmPasswordError,
    });

    return !(usernameError || passwordError || confirmPasswordError);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      username: true,
      password: true,
      confirm_password: true,
    });

    const isValid = validateForm();
    if (!isValid) return;

    setLoading(true);

    try {
      await registerUser({
        username: data.username,
        password: data.password,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/sign/login');
      }, 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    data.username &&
    data.password &&
    data.confirm_password &&
    !errors.username &&
    !errors.password &&
    !errors.confirm_password;

  return {
    data,
    errors,
    touched,
    loading,
    success,
    isFormValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setTouched,
  };
};
