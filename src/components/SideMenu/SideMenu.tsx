import { Link } from 'react-router-dom';

export const SideMenu = () => {
  return (
    <div>
      <ul>
        <Link to={'/'}>Home</Link>
        <Link to={'/about'}>About</Link>
        <Link to={'/sign/login'}>Login</Link>
      </ul>
    </div>
  );
};
