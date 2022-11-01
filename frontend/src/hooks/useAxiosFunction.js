/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

const useAxiosFunction = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');
  const [statusCode, setStatusCode] = useState(0);
  const [loading, setLoading] = useState(false); // different!
  const [controller, setController] = useState();

  const axiosFetch = async (configObj) => {
    const {
      axiosInstance, method, url, requestConfig = {},
    } = configObj;

    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
      },
      );
      setStatusCode(res.status);
      setResponse(res.data);
    } catch (err) {
      setStatusCode(err.response.status);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(
    () => controller && controller.abort(),

    [controller],
  );

  return [response, statusCode, error, loading, axiosFetch];
};

export default useAxiosFunction;
