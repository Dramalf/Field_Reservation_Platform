import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './components/Login'
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/view' component={App} />
        <Route path='/login' component={Login} />
        <Redirect to='/view' />
      </Switch>
    </Router>


  </Provider>,
  document.getElementById('root')
);

