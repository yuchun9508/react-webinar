import { Fragment, useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import WebinarItem from '../components/Home/WebinarItem';
import classes from './RegisteredWebinars.module.css';

const RegisteredWebinars = (props) => {
  const user = useSelector((state) => state.auth.user);
  const { id } = user;

  const [webinarItems, setWebinarItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.finlogix.com/v1/posts?favourited=1&author=${id}&per_page=6&page=1`
      );

      const responseData = await response.json();

      setIsLoading(false);

      if (!response.ok) {
        let errorMessage = 'Fetch data failed!';
        if (responseData && responseData.error && responseData.error.message) {
          errorMessage = responseData.error.message;
        }
        throw new Error(errorMessage);
      }
      setWebinarItems(responseData.data);
    } catch (error) {
      alert(error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Fragment>
      <section className={classes.webinars}>
        <div className="container">
          {isLoading && <p className={classes.loading}>Loading...</p>}
          {!isLoading && (
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
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default RegisteredWebinars;
