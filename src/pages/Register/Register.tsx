import * as styles from './Register.module.scss';

export const RegisterPage = () => {
  return (
    <form className={styles.form}>
      <h1>Register</h1>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm Password" />
      <button type="submit">Register</button>
    </form>
  );
};
