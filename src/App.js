import axios from 'axios'
import { Route, Switch, Link } from 'react-router-dom'

import UserPanel from './components/UserPanel'
import HomePage from './views/home_page/HomePage'
import LoginPage from './views/login_page/LoginPage'

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <div>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      </div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
