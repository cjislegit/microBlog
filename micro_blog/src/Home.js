import { useState, useEffect } from 'react';
import BlogList from './BlogList';

const Home = () => {
  const [blogs, setBlogs] = useState(null);

  const [name, setName] = useState('Mia');

  const handleNameChange = () => {
    setName('Goose');
  };

  // Runs on every render
  // useEffect(() => {
  //   console.log('Use effect ran');
  // });

  // Runs on first render
  useEffect(() => {
    fetch('http://localhost:8000/blogs')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
      });
  }, []);

  // Runs on first render
  useEffect(() => {
    console.log('First render or name change.');
  }, [name]);

  return (
    <div className='home'>
      {blogs && <BlogList blogs={blogs} />}
      <button onClick={handleNameChange}>Change Name</button>
      <p>{name}</p>
    </div>
  );
};

export default Home;
