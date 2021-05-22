import { useState, useEffect } from 'react';
import BlogList from './BlogList';

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  // const [name, setName] = useState('Mia');

  // const handleNameChange = () => {
  //   setName('Goose');
  // };

  // Runs on every render
  // useEffect(() => {
  //   console.log('Use effect ran');
  // });

  // Runs on first render
  useEffect(() => {
    fetch('http://localhost:8000/blogs')
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch the data');
        }
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, []);

  // // Runs on first render
  // useEffect(() => {
  //   console.log('First render or name change.');
  // }, [name]);

  return (
    <div className='home'>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} />}
      {/* <button onClick={handleNameChange}>Change Name</button>
      <p>{name}</p> */}
    </div>
  );
};

export default Home;
