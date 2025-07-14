import { FormEvent, useState } from 'react';

import { changeName } from '@/api/changeName';
import { ChangeNamePayload } from '@/api/types';
import { Alert, AlertProps } from '@/ui/Alert/Alert';
import { Button } from '@/ui/Button';
import { setAlert, usernameRegex } from '@/ui/constants';
import { Input } from '@/ui/Input';

import * as styles from './ChangeName.module.scss';

export const ChangeName = ({ currentName }: { currentName: string }) => {
  const [username, setUsername] = useState<ChangeNamePayload>({ username: '' });
  const [currentUsername, setCurrentUsername] = useState(currentName);
  const [errors, setErrors] = useState<string | null>(null);
  const [alertInfo, setAlertInfo] = useState<AlertProps | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername({ username: value });

    if (value === currentUsername) {
      setErrors('New username must be different from the current one.');
    } else if (!usernameRegex.test(value)) {
      setErrors('Username can only contain letters, numbers, underscores and dashes.');
    } else if (value.length < 5) {
      setErrors('New username must be longer than or equal to 5 characters.');
    } else {
      setErrors(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    changeName(username)
      .then(() => {
        setAlert('success', 'Username changed successfully.', setAlertInfo);
        setCurrentUsername(username.username);
        setUsername({ username: '' });
      })
      .catch((err) => {
        const errorResponse = err.response?.data;
        const errors = [errorResponse?.message || err.message];
        setAlert('error', errors.join('\n'), setAlertInfo);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isFormValid =
    username.username &&
    username.username !== currentUsername &&
    usernameRegex.test(username.username);

  return (
    <form className={styles.accountBlock} onSubmit={handleSubmit}>
      {alertInfo && <Alert message={alertInfo.message} type={alertInfo.type} />}

      <Input
        name="username"
        placeholder="New username"
        value={username.username}
        onChange={handleChange}
      />
      {errors && <p className={styles.error}>{errors}</p>}

      <Button
        className={styles.submitBtn}
        text="Save"
        type="submit"
        disabled={!isFormValid || loading}
      />
    </form>
  );
};
