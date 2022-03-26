import { useCallback, useState } from 'react';

const API_BASE_URL = 'https://api.finlogix.com/v1';

const useHttp = (actionFn) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async (fetchResource, fetchInit) => {
      setIsLoading(true);

      try {
        const response = await fetch(API_BASE_URL + fetchResource, fetchInit);

        const responseData = await response.json();

        setIsLoading(false);

        if (!response.ok) {
          let errorMessage = 'Failed!';
          if (
            responseData &&
            responseData.error &&
            responseData.error.message
          ) {
            errorMessage = responseData.error.message;
          }
          throw new Error(errorMessage);
        }

        actionFn(responseData);
      } catch (error) {
        alert(error);
      }
    },
    [actionFn]
  );

  return {
    isLoading,
    sendRequest,
  };
};

export default useHttp;
