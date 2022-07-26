import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Login from './components/Login';
import Logout from './components/Logout';
import GasPrices from './components/GasPrices';
import axios from "axios"

import privateRoute from "./components/privateRoute";

function App() {
  const logout = () => {
    //let the server know teh user is logged out.
    //remove token from local storage.

    axios.post("https://localhost:5001/api/logout", {
      userToken: localStorage.getItem("token")
    })
      .then(res => {
        localStorage.removeItem("token")
        window.location.href = "/login"
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link onClick={logout}>Logout</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Switch>
          <privateRoute exact path="/protected" component={GasPrices} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
