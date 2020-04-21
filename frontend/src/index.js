import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import LandingPage from "./components/LandingPage/LandingPage";


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
      <App>
        <Switch>
            <Route exact path='/login' component={Login}/>
            <Route path='/' component={LandingPage}/>
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
