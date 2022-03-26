import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authActions } from '../../store/auth';
import classes from './AuthForm.module.css';
import Card from '../UI/Card';

const AuthForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // omit validation

    setIsLoading(true);

    try {
      const response = await fetch(
        'https://api.finlogix.com/v1/auth/email/login',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const responseData = await response.json();

      setIsLoading(false);

      if (!response.ok) {
        let errorMessage = 'Login failed!';
        if (responseData && responseData.error && responseData.error.message) {
          errorMessage = responseData.error.message;
        }
        throw new Error(errorMessage);
      }

      dispatch(
        authActions.login({
          token: responseData.token,
          user: {
            id: responseData.user.id,
            firstName: responseData.user.first_name,
            lastName: responseData.user.last_name,
            email: responseData.user.email,
          },
        })
      );
      history.replace('/');
    } catch (error) {
      alert(error);
    }
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
