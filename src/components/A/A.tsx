import { useState } from 'react';

import { loginUser } from '@/api/login';
import { registerUser } from '@/api/register';

export function LoginButton() {
  const [loading, setLoading] = useState(false);
  const [regLoad, setRegLoad] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await loginUser({
        username: 'danya',
        password: '12345Aa*',
      });

      console.log('Успешный вход:', response);
      // Здесь можешь сохранить токен или сделать редирект
    } catch (error) {
      console.error('Ошибка входа:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegist = async () => {
    setRegLoad(true);
    try {
      const response = await registerUser({
        username: '',
        password: '',
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    } finally {
      setRegLoad(false);
    }
  };

  return (
    <div>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Входим...' : 'Войти'}
      </button>
      <button onClick={handleRegist} disabled={regLoad}>
        {regLoad ? 'Входим...' : 'Войти'}
      </button>
    </div>
  );
}
