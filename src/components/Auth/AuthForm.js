import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authActions } from '../../store/auth';
import classes from './AuthForm.module.css';
import Card from '../UI/Card';
import useHttp from '../../hooks/use-http';

const AuthForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { isLoading, sendRequest } = useHttp((data) => {
    dispatch(
      authActions.login({
        token: data.token,
        user: {
          id: data.user.id,
          firstName: data.user.first_name,
          lastName: data.user.last_name,
          email: data.user.email,
        },
      })
    );
    history.replace('/');
  });

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // omit validation

    sendRequest('/auth/email/login', {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <Card className={classes.authForm}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>Login</button>}
          {isLoading && <p>Sending request...</p>}
        </div>
      </form>
    </Card>
  );
};

export default AuthForm;
