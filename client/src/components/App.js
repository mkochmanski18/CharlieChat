import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path="/registration">
            <RegisterPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
