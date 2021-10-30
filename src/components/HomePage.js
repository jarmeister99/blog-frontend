import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'

import UserPanel from './UserPanel'
import PostListing from './PostListing'
import CreatePost from './CreatePost'

axios.defaults.withCredentials = true;

function HomePage() {
  const [user, setUser] = useState('');
  const [posts, setPosts] = useState([]);
  // check to see if we are logged in
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/user_data`).then(response => {
      if (response.data.username !== undefined) {
        setUser(response.data.username);
      }
    }).catch(error => {
      console.log(error);
    })
  }, [])
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
