import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'

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
    <div className="App">
      <Container>
        <Row>
          <Col md={{ offset: 1, span: 10 }} sm={{ span: 12 }}>
            <UserPanel setUser={setUser} user={user} />
            {user && <CreatePost posts={posts} setPosts={setPosts} />}
            <PostListing user={user} posts={posts} setPosts={setPosts} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
