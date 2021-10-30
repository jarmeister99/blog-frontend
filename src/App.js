import axios from 'axios'
import { Route, Switch } from 'react-router-dom'

import HomePage from './views/home_page/HomePage'
import LoginPage from './views/login_page/LoginPage'
import ControlBar from './views/control_bar/ControlBar'

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <ControlBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
