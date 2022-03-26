import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { authActions } from '../../store/auth';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const token = useSelector((state) => state.auth.token);
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const response = await fetch('https://api.finlogix.com/v1/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        let errorMessage = 'Logout failed!';
        if (responseData && responseData.error && responseData.error.message) {
          errorMessage = responseData.error.message;
        }
        throw new Error(errorMessage);
      }

      dispatch(authActions.logout());
    } catch (error) {
      alert(error);
    }
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
