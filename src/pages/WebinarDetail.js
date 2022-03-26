import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import classes from './WebinarDetail.module.css';

const WebinarDetail = () => {
  const params = useParams();
  const { webinarId } = params;

  const [loadedWebinarDetail, setLoadedWebinarDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.finlogix.com/v1/posts/${webinarId}`
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

      setLoadedWebinarDetail(responseData.data);
    } catch (error) {
      alert(error);
    }
  }, [webinarId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createMarkup = () => {
    return { __html: loadedWebinarDetail.content };
  };

  return (
    <section className={classes.detail}>
      <div className="container">
        {isLoading && <p>Loading...</p>}
        <h1>{loadedWebinarDetail.title}</h1>
        <div dangerouslySetInnerHTML={createMarkup()}></div>
      </div>
    </section>
  );
};

export default WebinarDetail;
