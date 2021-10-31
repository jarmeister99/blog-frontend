import axios from 'axios'
import { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import HomePage from './views/home_page/HomePage'
import LoginPage from './views/login_page/LoginPage'
import ControlBar from './views/control_bar/ControlBar'

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState('');
  const [posts, setPosts] = useState([]);

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
      <ControlBar user={user} setUser={setUser}/>
      <Switch>
        <Route exact path="/" component={() => <HomePage user={user} posts={posts} setPosts={setPosts}/>} />
        <Route path="/login" component={() => <LoginPage user={user} setUser={setUser}/>} />
      </Switch>
    </div>
  );
}

export default App;
