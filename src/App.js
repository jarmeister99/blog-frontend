import axios from 'axios'
import { Route, Switch, Link } from 'react-router-dom'

import UserPanel from './components/UserPanel'
import HomePage from './components/HomePage'

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={UserPanel} />
      </Switch>
    </div>
  );
}

export default App;
