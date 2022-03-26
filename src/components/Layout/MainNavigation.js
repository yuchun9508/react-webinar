import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { authActions } from '../../store/auth';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const token = useSelector((state) => state.auth.token);
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const { sendRequest } = useHttp((data) => {
    dispatch(authActions.logout());
  });

  const logoutHandler = () => {
    sendRequest('/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          {!isAuth && (
            <li>
              <Link to="/auth" className={classes.button}>
                Login
              </Link>
            </li>
          )}
          {isAuth && (
            <li>
              <Link to="/registered" className={classes.button}>
                My Webinars
              </Link>
            </li>
          )}
          {isAuth && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
