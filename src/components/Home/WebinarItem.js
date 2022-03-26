import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import classes from './WebinarItem.module.css';

const dateFormatter = (timestamp) => {
  const date = new Date(timestamp);
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  return `${day}/${month}/${year}`;
};

const expireDateCalculator = (timestamp) => {
  const date = new Date(timestamp);
  date.setDate(date.getDate() + 10);

  const [month, day, year, hours, minutes] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
    date.getHours(),
    date.getMinutes(),
  ];
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const WebinarItem = (props) => {
  const history = useHistory();
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const { id, title, created_at, content } = props.item;
  const createdAt = dateFormatter(created_at);
  const expireAt = expireDateCalculator(created_at);

  const createMarkup = () => {
    return { __html: content };
  };

  const registerHandler = () => {
    if (isAuth) {
      props.onSelect({ id: id, topic: title });
      history.push('/#register');
    } else {
      history.push('/auth');
    }
  };

  return (
    <div className={classes.item}>
      <div className={classes.date}>{createdAt}</div>
      <h4>{title}</h4>
      <div
        className={classes.content}
        dangerouslySetInnerHTML={createMarkup()}
      ></div>
      <div className={classes.time}>{expireAt}</div>
      <div className={classes.actions}>
        <button onClick={registerHandler}>Register Now</button>
        <Link to={`/webinar/${id}`}></Link>
      </div>
    </div>
  );
};

export default WebinarItem;
