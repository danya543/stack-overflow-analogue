import * as styles from './Account.module.scss';

export const AccountPage = () => {
  return (
    <div>
      <h1>accountPage</h1>
      <div className={styles.accountBlock}>change name</div>
      <div className={styles.accountBlock}>change password</div>
      <div className={styles.accountBlock}>delete account</div>
    </div>
  );
};
