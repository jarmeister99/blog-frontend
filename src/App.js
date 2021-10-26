import { useEffect, useState } from 'react'
import axios from 'axios'

import UserPanel from './components/UserPanel'
import PostListing from './components/PostListing'
import CreatePost from './components/CreatePost'

axios.defaults.withCredentials = true;

function App() {
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
    <div className="App" style={{ display: "flex" }}>
      <div style={{ flex: "20%"}}>fooba</div>
      <div style={{ flex: "60"}}>
        <UserPanel setUser={setUser} user={user} />
        {user && <CreatePost posts={posts} setPosts={setPosts} />}
        <PostListing user={user} posts={posts} setPosts={setPosts} />
      </div>
      <div style={{ flex: "20%"}}></div>
    </div>
  );
}

export default App;
