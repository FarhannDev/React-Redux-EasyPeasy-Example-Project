import { useState, useEffect } from "react";
import axios from "axios";

export default function useAxiosFetch(dataUrl) {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    const fetchData = async (uri) => {
      try {
        setIsloading(true);
        const response = await axios.get(uri, { cancelToken: source.token });
        isMounted && setData(response.data);
        setFetchError(null);
      } catch (error) {
        isMounted && setFetchError(error.message);
        setData([]);
      } finally {
        isMounted &&
          setTimeout(() => {
            setIsloading(false);
          }, 2000);
      }
    };

    (async () => fetchData(dataUrl))();

    // Update dependencies
    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [dataUrl]);

  return { data, fetchError, isLoading };
}
