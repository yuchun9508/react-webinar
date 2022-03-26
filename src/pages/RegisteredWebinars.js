import { Fragment, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WebinarItem from '../components/Home/WebinarItem';
import useHttp from '../hooks/use-http';
import { webinarActions } from '../store/webinar';
import classes from './RegisteredWebinars.module.css';

const RegisteredWebinars = (props) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const webinarItems = useSelector((state) => state.webinar.items);
  const currentPage = useSelector((state) => state.webinar.currentPage);
  const totalPages = useSelector((state) => state.webinar.totalPages);
  const dispatch = useDispatch();

  const { id } = user;

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

  useEffect(() => {
    dispatch(webinarActions.reset());
  }, [dispatch]);

  useEffect(() => {
    sendRequest(
      `/posts?favourited=1&author=${id}&per_page=6&page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }, [currentPage, id, token, sendRequest]);

  const loadMoreHandler = () => {
    dispatch(webinarActions.incrementCurrentPage());
  };

  return (
    <Fragment>
      <section className={classes.webinars}>
        <div className="container">
          <ul>
            {webinarItems.map((item) => {
              return (
                <li key={item.id}>
                  <WebinarItem
                    item={{
                      id: item.id,
                      created_at: item.created_at,
                      title: item.title,
                      content: item.content,
                    }}
                  />
                </li>
              );
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

export default RegisteredWebinars;
