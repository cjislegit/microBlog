import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController(); //Sets up new AbortController

    fetch(url, { signal: abortCont.signal }) //Attaches abortCont to this fetch
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch the data');
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          //Prevents the error from being thrown if it is an AbortError
          console.log('Fetch Aboarted');
        } else {
          setError(err.message);
          setIsPending(false);
        }
      });

    return () => abortCont.abort(); //Runs abortCont when the component is unmounted
  }, [url]);
  return { data, isPending, error };
};

export default useFetch;

// Start server
// npx json-server --watch data/db.json --port 8000
