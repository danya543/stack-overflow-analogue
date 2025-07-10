import { FormEvent, useEffect, useState } from 'react';

import { changePassword } from '@/api/changePassword';
import { Alert, AlertProps } from '@/ui/Alert/Alert';
import { Button } from '@/ui/Button';
import { passwordRegex } from '@/ui/constants';
import { PasswordInput } from '@/ui/PasswordInput';

import * as styles from './ChangePassword.module.scss';

interface ChangePassword {
  old: string;
  new: string;
  confirm: string;
}

export const ChangePassword = () => {
  const [passwords, setPasswords] = useState<ChangePassword>({
    old: '',
    new: '',
    confirm: '',
  });

  const [errors, setErrors] = useState<{ new?: string; confirm?: string }>({});
  const [alertInfo, setAlertInfo] = useState<AlertProps | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const validationErrors: { new?: string; confirm?: string } = {};

    if (passwords.new) {
      if (!passwordRegex.test(passwords.new)) {
        validationErrors.new =
          'Password must contain at least one lowercase letter, one uppercase letter, one number and one symbol.';
      } else if (passwords.new === passwords.old) {
        validationErrors.new = 'New password must be different from the old password.';
      }
    }

    if (passwords.confirm && passwords.new !== passwords.confirm) {
      validationErrors.confirm = 'Passwords do not match.';
    }

    setErrors(validationErrors);
  }, [passwords.new, passwords.confirm, passwords.old]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    passwordRegex.test(passwords.new) &&
    passwords.new === passwords.confirm &&
    passwords.new !== passwords.old;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    changePassword({
      oldPassword: passwords.old,
      newPassword: passwords.new,
    })
      .then(() => {
        setAlert('success', 'Password changed successfully.');
        setPasswords({ old: '', new: '', confirm: '' });
      })
      .catch((err) => {
        const errorResponse = err.response?.data;
        const errors = [errorResponse?.message || err.message];
        setAlert('error', errors.join('\n'));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setAlert = (type: 'error' | 'success', message: string) => {
    setAlertInfo({ type, message });
    setTimeout(() => setAlertInfo(null), 3500);
  };

  return (
    <form className={styles.accountBlock} onSubmit={handleSubmit}>
      {alertInfo && <Alert message={alertInfo.message} type={alertInfo.type} />}

      <PasswordInput
        name="old"
        placeholder="Old password"
        value={passwords.old}
        onChange={handleChange}
      />

      <PasswordInput
        name="new"
        placeholder="New password"
        value={passwords.new}
        onChange={handleChange}
      />
      {errors.new && <p className={styles.error}>{errors.new}</p>}

      <PasswordInput
        name="confirm"
        placeholder="Confirm password"
        value={passwords.confirm}
        onChange={handleChange}
      />
      {errors.confirm && <p className={styles.error}>{errors.confirm}</p>}

      <Button
        className={styles.submitBtn}
        text="Change password"
        type="submit"
        disabled={!isFormValid || loading}
      />
    </form>
  );
};
