import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import LandingPage from "./components/LandingPage/LandingPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('access');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const payload = loadState();

const action = {
  type: 'LOGIN_USER',
  payload,
};

if (payload) {
  store.dispatch(action);
}


ReactDOM.render(
  <Provider store={ store }>
    <Router>
        <Switch>
            <Route exact path='/login' component={Login}/>
            <PrivateRoute path='/' component={LandingPage}/>
        </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
