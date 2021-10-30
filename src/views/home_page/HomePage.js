import { useEffect, useState } from 'react'
import axios from 'axios'

import PostListing from './posts/PostListing'

axios.defaults.withCredentials = true;

function HomePage() {
  const [user, setUser] = useState('');
  const [posts, setPosts] = useState([]);

  // display all posts from server
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts`).then(response => {
      setPosts(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [])
  return (
    <div>
      <PostListing user={user} posts={posts} setPosts={setPosts}></PostListing>
    </div>
  );
}

export default HomePage;
