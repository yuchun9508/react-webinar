import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import classes from './RegisterForm.module.css';
import Card from '../UI/Card';
import useHttp from '../../hooks/use-http';

const RegisterForm = (props) => {
  const history = useHistory();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const { firstName, lastName, email } = user || {};

  const { defaultWebinar } = props;
  const [topicSelect, setTopicSelect] = useState(defaultWebinar.id || '');
  const [firstNameInput, setFirstNameInput] = useState(firstName || '');
  const [lastNameInput, setLastNameInput] = useState(lastName || '');
  const [emailInput, setEmailInput] = useState(email || '');

  const topicSelectIsInvalid = !topicSelect;
  const firstNameInputIsInvalid = !firstNameInput;
  const lastNameInputIsInvalid = !lastNameInput;
  const emailInputIsInvalid = !emailInput;
  const formIsInvalid =
    topicSelectIsInvalid ||
    firstNameInputIsInvalid ||
    lastNameInputIsInvalid ||
    emailInputIsInvalid;

  useEffect(() => {
    setTopicSelect(defaultWebinar.id);
  }, [defaultWebinar]);

  const { isLoading, sendRequest } = useHttp((data) => {
    history.push('/registered');
  });

  const changeHandler = (key, event) => {
    const value = event.target.value;

    switch (key) {
      case 'TOPIC':
        setTopicSelect(value);
        break;
      case 'FIRST_NAME':
        setFirstNameInput(value);
        break;
      case 'LAST_NAME':
        setLastNameInput(value);
        break;
      case 'EMAIL':
        setEmailInput(value);
        break;
      default:
        break;
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (formIsInvalid) {
      return;
    }

    sendRequest('/favourites', {
      method: 'POST',
      body: JSON.stringify({
        ids: [topicSelect],
        model: 'post',
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <Card className={classes.registerForm}>
      <h1>Register for a Webinar now</h1>
      <p>
        Please fill in the form below and you will be contacted by one of our
        professional business experts.
      </p>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            topicSelectIsInvalid && classes.invalid
          }`}
        >
          <label htmlFor="topic-select">Topic*</label>
          <select
            name="topics"
            id="topic-select"
            value={topicSelect}
            onChange={changeHandler.bind(null, 'TOPIC')}
          >
            <option value="">Please select one webinar above</option>
            <option value={props.defaultWebinar.id}>
              {props.defaultWebinar.topic}
            </option>
          </select>
        </div>
        <div
          className={`${classes.control} ${
            firstNameInputIsInvalid && classes.invalid
          }`}
        >
          <label htmlFor="first-name-input">First Name*</label>
          <input
            type="text"
            id="first-name-input"
            required
            value={firstNameInput}
            onChange={changeHandler.bind(null, 'FIRST_NAME')}
          />
        </div>
        <div
          className={`${classes.control} ${
            lastNameInputIsInvalid && classes.invalid
          }`}
        >
          <label htmlFor="last-name-input">Last Name*</label>
          <input
            type="text"
            id="last-name-input"
            required
            value={lastNameInput}
            onChange={changeHandler.bind(null, 'LAST_NAME')}
          />
        </div>
        <div
          className={`${classes.control} ${
            emailInputIsInvalid && classes.invalid
          }`}
        >
          <label htmlFor="email">Your Email*</label>
          <input
            type="email"
            id="email"
            required
            value={emailInput}
            onChange={changeHandler.bind(null, 'EMAIL')}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button disabled={formIsInvalid}>Register</button>}
          {isLoading && <p>Sending request...</p>}
        </div>
      </form>
    </Card>
  );
};

export default RegisterForm;
