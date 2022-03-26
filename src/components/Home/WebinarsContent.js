import { Fragment, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './WebinarsContent.module.css';
import { webinarActions } from '../../store/webinar';
import useHttp from '../../hooks/use-http';

const WebinarsContent = (props) => {
  const token = useSelector((state) => state.auth.token);
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const webinarItems = useSelector((state) => state.webinar.items);
  const currentPage = useSelector((state) => state.webinar.currentPage);
  const totalPages = useSelector((state) => state.webinar.totalPages);
  const dispatch = useDispatch();

  const { isLoading, sendRequest } = useHttp(
    useCallback(
      (data) => {
        if (currentPage > 1) {
          dispatch(webinarActions.addItems(data.data));
        } else if (currentPage === 1) {
          dispatch(webinarActions.setItems(data.data));
        }
        dispatch(
          webinarActions.setTotalPages(data.meta.pagination.total_pages)
        );
      },
      [currentPage, dispatch]
    )
  );

  let url = '/posts?';
  if (isAuth) {
    url += `favourited=0&author=${user.id}&`;
  }

  useEffect(() => {
    dispatch(webinarActions.reset());
  }, [dispatch]);

  useEffect(() => {
    sendRequest(url + `per_page=6&page=${currentPage}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [currentPage, token, url, sendRequest]);

  const loadMoreHandler = () => {
    dispatch(webinarActions.incrementCurrentPage());
  };

  return (
    <Fragment>
      <section className={classes.introduction}>
        <div className="container">
          <h1>Forex Webinars</h1>
          <p>
            Whether you are new to foreign exchange trading or already have some
            market experience, we believe that a solid FX trading education is
            vital to your success as a trader.
          </p>
        </div>
      </section>
      <section className={classes.webinars}>
        <div className="container">
          <ul>
            {webinarItems.map((item) => {
              return <li key={item.id}>{props.render(item)}</li>;
            })}
          </ul>
          {isLoading && <p className={classes.loading}>Loading...</p>}
          {currentPage < totalPages && (
            <div className={classes.actions}>
              <button onClick={loadMoreHandler}>Load more</button>
            </div>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default WebinarsContent;
