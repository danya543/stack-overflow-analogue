import * as styles from './Login.module.scss';

export const LoginPage = () => {
  return (
    <form className={styles.form}>
      <h1>Login</h1>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  )
}
