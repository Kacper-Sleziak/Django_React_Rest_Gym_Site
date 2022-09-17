import { useState, useEffect } from 'react';

const useAxios = (configObj) => {
  const {
    axiosInstance,
    method,
    url,
    requestConfig = {},
  } = configObj;

  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  const refetch = () => setReload((prev) => prev + 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
        });
        setResponse(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // call the function
    fetchData();

    // eslint-disable-next-line
    }, [reload]);

  return [response, error, loading, refetch];
};

export default useAxios;
