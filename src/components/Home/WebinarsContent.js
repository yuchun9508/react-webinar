import { Fragment, useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './WebinarsContent.module.css';
import { webinarActions } from '../../store/webinar';

const WebinarsContent = (props) => {
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const webinarItems = useSelector((state) => state.webinar.items);
  const currentPage = useSelector((state) => state.webinar.currentPage);
  const totalPages = useSelector((state) => state.webinar.totalPages);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  let url = 'https://api.finlogix.com/v1/posts?';
  if (isAuth) {
    url += `favourited=0&author=${user.id}&`;
  }

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(url + `per_page=6&page=${currentPage}`);

      const responseData = await response.json();

      setIsLoading(false);

      if (!response.ok) {
        let errorMessage = 'Fetch data failed!';
        if (responseData && responseData.error && responseData.error.message) {
          errorMessage = responseData.error.message;
        }
        throw new Error(errorMessage);
      }
      // console.log(responseData);
      if (currentPage > 1) {
        dispatch(webinarActions.addItems(responseData.data));
      } else if (currentPage === 1) {
        dispatch(webinarActions.setItems(responseData.data));
      }
      dispatch(
        webinarActions.setTotalPages(responseData.meta.pagination.total_pages)
      );
    } catch (error) {
      alert(error);
    }
  }, [url, currentPage, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
