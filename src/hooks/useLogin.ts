import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '@/api/login';

interface LoginData {
  username: string;
  password: string;
}

export const useLogin = (initialValues: LoginData) => {
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    loginUser({
      username: data.username,
      password: data.password,
    })
      .then((data) => {
        console.log(data.data);
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('user_id', JSON.stringify(data.data.id));
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isFormValid = data.username !== '' && data.password !== '';

  return {
    data,
    loading,
    success,
    isFormValid,
    handleChange,
    handleSubmit,
  };
};
